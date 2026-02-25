import logger from "./logger";

type CircuitState = "closed" | "open" | "half-open";

export class CircuitBreaker {
  private state: CircuitState = "closed";
  private failureCount = 0;
  private lastFailureTime = 0;
  private readonly threshold: number;
  private readonly cooldownMs: number;
  private readonly name: string;

  constructor(name: string, threshold = 5, cooldownMs = 30000) {
    this.name = name;
    this.threshold = threshold;
    this.cooldownMs = cooldownMs;
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "open") {
      if (Date.now() - this.lastFailureTime >= this.cooldownMs) {
        this.state = "half-open";
        logger.info({ circuit: this.name }, "Circuit breaker half-open, testing");
      } else {
        throw new Error(`Circuit breaker "${this.name}" is open — service temporarily unavailable`);
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  private onSuccess() {
    if (this.state === "half-open") {
      logger.info({ circuit: this.name }, "Circuit breaker closed — service recovered");
    }
    this.failureCount = 0;
    this.state = "closed";
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.threshold) {
      this.state = "open";
      logger.error({ circuit: this.name, failures: this.failureCount }, "Circuit breaker opened");
    }
  }

  getState(): CircuitState {
    return this.state;
  }
}
