import { Injectable } from '@angular/core';
import { DrawingZoneDatas } from '../datas/drawing-zone-datas';

@Injectable({
  providedIn: 'root'
})
export class Zone {

  public log: boolean = true;
  public screen!: any;
  public zone!: any;

  constructor(
    public datas: DrawingZoneDatas
  ){
    if(this.log){console.log('zone.constructor()');}
    this.screen = this.datas.getScreen();
    this.zone = this.datas.getZone();
  }

  public init(): void {
    if(this.log){console.log(`zone.init()`);}
    this.screen = this.datas.getScreen();

    this.initSize();
    this.initOffset_base();
    this.initOffset();
    this.initCenterPoint();
    this.initCorners();
    this.initPanLimits();

    this.datas.setZone(this.zone);
  }

  public initSize(): void {
    if(this.log){console.log(`zone.initSize()`);}    

    this.zone.width_base = this.screen.width;
    this.zone.height_base = this.screen.width;

    this.zone.width = this.zone.width_base * this.zone.zoom;
    this.zone.height = this.zone.height_base * this.zone.zoom;

    if(this.log){console.log(`zone size: width: ${this.zone.width}, height: ${this.zone.height}`);};
  }

  public initOffset_base(): void {
    if(this.log){console.log(`zone.initOffset_base()`);}

    this.zone.left_base = 0;
    this.zone.top_base = -(this.zone.height - this.screen.height)/2;
  }

  public initOffset(): void {
    if(this.log){console.log(`zone.initOffset()`);}

    this.zone.left = this.zone.left_base + this.zone.panX;
    this.zone.top = this.zone.top_base - this.zone.panY;
  }

  public initCenterPoint(): void {
    if(this.log){console.log(`zone.initCenterPoint()`);}

    const x = this.screen.center.absolute_offset.x;
    const y = this.screen.center.absolute_offset.y;

    this.zone.center.absolute_offset.x = x;
    this.zone.center.absolute_offset.y = y;
    this.zone.center.relative_offset.x = 0;
    this.zone.center.relative_offset.y = 0;
    this.zone.center.absolute_offset.x = (this.screen.left + (this.screen.width/2));
    this.zone.center.absolute_offset.y = (this.screen.top + (this.screen.height/2));
  }

  public initCorners(): void {
    if(this.log){console.log(`zone.initCorners()`);}

    this.zone.corners.topLeft.absolute_offset.x = this.screen.corners.topLeft.absolute_offset.x;
    this.zone.corners.topLeft.absolute_offset.y = this.screen.corners.topLeft.absolute_offset.y - ((this.zone.height - this.screen.height)/2);
    this.zone.corners.topLeft.relative_offset.x = -(this.zone.width/2);
    this.zone.corners.topLeft.relative_offset.y = (this.zone.height/2);

    this.zone.corners.topRight.absolute_offset.x = this.screen.corners.topRight.absolute_offset.x;
    this.zone.corners.topRight.absolute_offset.y = this.screen.corners.topRight.absolute_offset.y - ((this.zone.height - this.screen.height)/2);
    this.zone.corners.topRight.relative_offset.x = (this.zone.width/2);
    this.zone.corners.topRight.relative_offset.y = (this.zone.height/2);

    this.zone.corners.bottomRight.absolute_offset.x = this.screen.corners.bottomRight.absolute_offset.x;
    this.zone.corners.bottomRight.absolute_offset.y = this.screen.corners.bottomRight.absolute_offset.y + ((this.zone.height - this.screen.height)/2);
    this.zone.corners.bottomRight.relative_offset.x = (this.zone.width/2);
    this.zone.corners.bottomRight.relative_offset.y = -(this.zone.height/2);

    this.zone.corners.bottomLeft.absolute_offset.x = this.screen.corners.bottomLeft.absolute_offset.x;
    this.zone.corners.bottomLeft.absolute_offset.y = this.screen.corners.bottomLeft.absolute_offset.y + ((this.zone.height - this.screen.height)/2);
    this.zone.corners.bottomLeft.relative_offset.x = -(this.zone.width/2);
    this.zone.corners.bottomLeft.relative_offset.y = -(this.zone.height/2);
  }

  public initPanLimits(): void {
    if(this.log){console.log(`zone.initPanLimits()`);}

    const dx = Math.max(0, (this.zone.width - this.screen.width) / 2);
    const dy = Math.max(0, (this.zone.height - this.screen.height) / 2);

    this.zone.panX_Max = dx;
    this.zone.panX_Min = -dx;

    this.zone.panY_Max = dy;
    this.zone.panY_Min = -dy;
  }

  public updateSize(): void {
    if(this.log){console.log(`zone.updateSize()`);}
    this.zone.width = this.zone.width_base * this.zone.zoom;
    this.zone.height = this.zone.height_base * this.zone.zoom;
  }

  public updateOffset_base(): void {
    if(this.log){console.log(`zone.updateOffset_base()`);}
    this.zone.left_base = -(this.zone.width - this.screen.width)/2;
    this.zone.top_base = -(this.zone.height - this.screen.height)/2;
  }

  public clampPanToLimits(): void {
    if(this.log){console.log(`zone.clampPanToLimits()`);}
    this.zone.panX = Math.min(this.zone.panX_Max, Math.max(this.zone.panX_Min, this.zone.panX));
    this.zone.panY = Math.min(this.zone.panY_Max, Math.max(this.zone.panY_Min, this.zone.panY));
  }

  public updateOffset(): void {
    if(this.log){console.log(`zone.updateOffset()`);}
    this.zone.left = this.zone.left_base + this.zone.panX;
    this.zone.top = this.zone.top_base - this.zone.panY;
  }

  public updateCenter(): void {
    if(this.log){console.log(`zone.updateOffset()`);}

    this.zone.center.absolute_offset.x = (this.screen.left + this.zone.left + (this.zone.width/2));
    this.zone.center.absolute_offset.y = (this.screen.top + this.zone.top + (this.zone.height/2));
  }

  public updateCorners(): void {
    if(this.log){console.log(`zone.updateCorners()`);}
    this.zone.corners.topLeft.relative_offset.x = -(this.zone.width/2);
    this.zone.corners.topLeft.relative_offset.y = (this.zone.height/2);
    this.zone.corners.topLeft.absolute_offset.x = (this.screen.left + this.zone.left);
    this.zone.corners.topLeft.absolute_offset.y = (this.screen.top + this.zone.top);

    this.zone.corners.topRight.relative_offset.x = (this.zone.width/2);
    this.zone.corners.topRight.relative_offset.y = (this.zone.height/2);
    this.zone.corners.topRight.absolute_offset.x = (this.screen.left + this.zone.left + this.zone.width);
    this.zone.corners.topRight.absolute_offset.y = (this.screen.top + this.zone.top);

    this.zone.corners.bottomRight.relative_offset.x = (this.zone.width/2);
    this.zone.corners.bottomRight.relative_offset.y = -(this.zone.height/2);
    this.zone.corners.bottomRight.absolute_offset.x = (this.screen.left + this.zone.left + this.zone.width);
    this.zone.corners.bottomRight.absolute_offset.y = (this.screen.top + this.zone.top + this.zone.height);

    this.zone.corners.bottomLeft.relative_offset.x = -(this.zone.width/2);
    this.zone.corners.bottomLeft.relative_offset.y = -(this.zone.height/2);
    this.zone.corners.bottomLeft.absolute_offset.x = (this.screen.left + this.zone.left);
    this.zone.corners.bottomLeft.absolute_offset.y = (this.screen.top + this.zone.top + this.zone.height);
  }

  public updatePanLimits(): void {
    if(this.log){console.log(`zone.updatePanLimits()`);}
    this.zone.panX_Max = (this.zone.width - this.screen.width)/2;
    this.zone.panX_Min = -(this.zone.width - this.screen.width)/2;

    this.zone.panY_Max = (this.zone.height - this.screen.height)/2;
    this.zone.panY_Min = -(this.zone.height - this.screen.height)/2;
  }

  public updateZoom(delta: number): void {
    if(this.log){console.log(`zone.updatePanLimits()`);}
    const next = this.zone.zoom + delta * this.zone.zoom_step;
    this.zone.zoom = Math.max(this.zone.zoom_min, Math.min(this.zone.zoom_max, next));
    this.applyZoom();
  }

  public applyZoom(): void {
    if(this.log){console.log(`zone.applyZoom()`);}
    this.updateSize();
    this.updateOffset_base();
    this.updatePanLimits();
    this.clampPanToLimits();
    this.updateOffset();
    this.updateCorners();

    this.datas.setZone(this.zone);
  }

  public updatePan(PanX: number, PanY: number): void {
    if(this.log){console.log(`zone.updatePan()`);}
    let nextPanX = this.zone.panX + PanX;
    let nextPanY = this.zone.panY + PanY;

    nextPanX = Math.min(this.zone.panX_Max, Math.max(this.zone.panX_Min, nextPanX));
    nextPanY = Math.min(this.zone.panY_Max, Math.max(this.zone.panY_Min, nextPanY));

    this.zone.panX = nextPanX;
    this.zone.panY = nextPanY;

    this.applyPan();
  }

  public applyPan(): void {
    if(this.log){console.log(`zone.updatePan()`);}
    this.updateOffset();
    this.updateCorners();
    this.updateCenter();
    this.datas.setZone(this.zone);
  }
  
}
