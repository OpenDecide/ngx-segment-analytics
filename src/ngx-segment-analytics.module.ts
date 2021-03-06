import {ModuleWithProviders, NgModule, Optional, PLATFORM_ID, SkipSelf} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {SegmentService} from './ngx-segment-analytics.service';
import {SEGMENT_CONFIG, SegmentConfig} from './ngx-segment-analytics.config';
import {WindowWrapper} from './window-wrapper';

/**
 * Window Provider for Angular AOT
 * @returns Browser Window instance
 */
export function getWindow(platformId: any) {
    return isPlatformBrowser(platformId) ? window : {};
}

/**
 * Segment Module
 */
@NgModule({
    imports: [CommonModule],
    providers: [
        {provide: WindowWrapper, useFactory: getWindow, deps: [PLATFORM_ID]},
    ]
})
export class SegmentModule {

    /**
     * Segment Module Initialisation
     *
     * @param config Segment Configuration
     * @returns Segment Module
     */
    public static forRoot(config?: SegmentConfig): ModuleWithProviders<SegmentModule> {
        return {
            ngModule: SegmentModule,
            providers: [
                {provide: SEGMENT_CONFIG, useValue: config},
                SegmentService,
            ],
        };
    }

    /**
     * Segment Module Constructor
     *
     * @param parentModule Must be null
     */
    constructor(@Optional() @SkipSelf() parentModule: SegmentModule) {
        if (parentModule) {
            throw new Error('SegmentModule is already loaded. Import it in the AppModule only');
        }
    }
}
