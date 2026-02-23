export interface TawkSettings {
    enabled: boolean;
    propertyId: string;
    widgetId: string;
    updatedAt?: string;
}
export declare function getTawkSettings(): Promise<TawkSettings>;
export declare function saveTawkSettings(settings: Partial<TawkSettings>): Promise<TawkSettings>;
//# sourceMappingURL=tawkSettingsService.d.ts.map