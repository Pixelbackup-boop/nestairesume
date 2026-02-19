import { prisma } from "./prisma";

export async function getGlobalSettings() {
  try {
    return await prisma.globalSettings.findFirst();
  } catch {
    return null;
  }
}
