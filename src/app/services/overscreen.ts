import { Injectable } from '@angular/core';
import { DrawingZoneDatas } from '../datas/drawing-zone-datas';

@Injectable({
  providedIn: 'root'
})
export class Overscreen {

  public log: boolean = true;
  public screen!: any;
  public zone!: any;
  public overscreen!: any;

  constructor(
    public datas: DrawingZoneDatas
  ){
    if(this.log){console.log('overscreen.constructor()');}
    this.screen = this.datas.getScreen();
    this.zone = this.datas.getZone();
    this.overscreen = this.datas.getOverscreen();
  }

  public init(): void {
    if(this.log){console.log(`overscreen.init()`);}
    this.screen = this.datas.getScreen();
    this.zone = this.datas.getZone();

    this.initSize();
    this.initOffset();
    this.initCenterPoint();
    this.initCorners();

    this.datas.setOverscreen(this.overscreen);
  }

  public initSize(): void {
    if(this.log){console.log(`overscreen.initSize()`);}

    // this.overscreen.width = (this.zone.width_zone  < this.screen.width  * 3) ? this.zone.width_zone  : this.screen.width  * 3;
    // this.overscreen.height = (this.zone.height_zone < this.screen.height * 3) ? this.zone.height_zone : this.screen.height * 3;

    this.overscreen.width = this.zone.width;
    this.overscreen.height = this.zone.height;

    this.overscreen.width_base = Math.max(this.overscreen.width,  this.screen.width);
    this.overscreen.height_base = Math.max(this.overscreen.height, this.screen.height);

    if(this.log){console.log(`overscreen size: width: ${this.overscreen.width}, height: ${this.overscreen.height}`);};
  }

  public initOffset(): void {
    if(this.log){console.log(`overscreen.initOffset()`);}

    this.overscreen.left = this.zone.left;
    this.overscreen.top = this.zone.top;
  }

  public initCenterPoint(): void {
    if(this.log){console.log(`overscreen.initCenterPoint()`);}

    const x = this.screen.center.absolute_offset.x;
    const y = this.screen.center.absolute_offset.y;

    this.overscreen.center.absolute_offset.x = x;
    this.overscreen.center.absolute_offset.y = y;
    this.overscreen.center.relative_offset.x = 0;
    this.overscreen.center.relative_offset.y = 0;
    this.overscreen.center.absolute_offset.x = (this.screen.left + (this.screen.width/2));
    this.overscreen.center.absolute_offset.y = (this.screen.top + (this.screen.height/2));
  }

  public initCorners(): void {
    if(this.log){console.log(`overscreen.initCorners()`);}

    this.overscreen.corners.topLeft.absolute_offset.x = this.screen.corners.topLeft.absolute_offset.x;
    this.overscreen.corners.topLeft.absolute_offset.y = this.screen.corners.topLeft.absolute_offset.y - ((this.overscreen.height - this.screen.height)/2);
    this.overscreen.corners.topLeft.relative_offset.x = -(this.zone.width/2);
    this.overscreen.corners.topLeft.relative_offset.y = (this.zone.height/2);

    this.overscreen.corners.topRight.absolute_offset.x = this.screen.corners.topRight.absolute_offset.x;
    this.overscreen.corners.topRight.absolute_offset.y = this.screen.corners.topRight.absolute_offset.y - ((this.overscreen.height - this.screen.height)/2);
    this.overscreen.corners.topRight.relative_offset.x = (this.zone.width/2);
    this.overscreen.corners.topRight.relative_offset.y = (this.zone.height/2);

    this.overscreen.corners.bottomRight.absolute_offset.x = this.screen.corners.bottomRight.absolute_offset.x;
    this.overscreen.corners.bottomRight.absolute_offset.y = this.screen.corners.bottomRight.absolute_offset.y + ((this.overscreen.height - this.screen.height)/2);
    this.overscreen.corners.bottomRight.relative_offset.x = (this.zone.width/2);
    this.overscreen.corners.bottomRight.relative_offset.y = -(this.zone.height/2);

    this.overscreen.corners.bottomLeft.absolute_offset.x = this.screen.corners.bottomLeft.absolute_offset.x;
    this.overscreen.corners.bottomLeft.absolute_offset.y = this.screen.corners.bottomLeft.absolute_offset.y + ((this.overscreen.height - this.screen.height)/2);
    this.overscreen.corners.bottomLeft.relative_offset.x = -(this.zone.width/2);
    this.overscreen.corners.bottomLeft.relative_offset.y = -(this.zone.height/2);
  }

  public applyZoom(): void {
    if(this.log){console.log(`overscreen.applyZoom()`);}
    this.update();
  }

  public applyPan(): void {
    if(this.log){console.log(`overscreen.applyPan()`);}
    this.update();
  }

  public update(): void {
    if(this.log){console.log(`overscreen.update()`);}

    this.screen = this.datas.getScreen();
    this.zone = this.datas.getZone();

    this.updateSize();
    this.updateOffset();
    this.updateCorners();

    this.datas.setOverscreen(this.overscreen);
  }

  public updateSize(): void {
    if(this.log){console.log(`overscreen.updateSize()`);}
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    // --- Overflow gauche/droite (bornés à screen.width) ---
    if (this.zone.corners.topleft.relative_offset.x > this.screen.corners.topLeft.relative_offset.x) {
      this.overscreen.overflowLeft = 0;
    } else {
      const d = this.screen.corners.topLeft.relative_offset.x - this.zone.corners.topLeft.relative_offset.x;
      this.overscreen.overflowLeft = Math.min(d, this.screen.width);
    }
  
    if (this.zone.corners.topRight.relative_offset.x < this.screen.corners.topRight.relative_offset.x) {
      this.overscreen.overflowRight = 0;
    } else {
      const d = this.zone.corners.topRight.relative_offset.x - this.screen.corners.topRight.relative_offset.x;
      this.overscreen.overflowRight = Math.min(d, this.screen.width);
    }

    const targetWidth = this.screen.width + this.overscreen.overflowLeft + this.overscreen.overflowRight;

    // --- Overflow haut/bas (bornés à screen.height) ---
    if (this.zone.corners.topRight.relative_offset.y < this.screen.corners.topRight.relative_offset.y) {
      this.overscreen.overflowTop = 0;
    } else {
      const d = this.zone.corners.topRight.relative_offset.y - this.screen.corners.topRight.relative_offset.y;
      this.overscreen.overflowTop = Math.min(d, this.screen.height);
    }
  
    if (this.zone.corners.bottomRight.relative_offset.y > this.screen.corners.bottomRight.relative_offset.y) {
      this.overscreen.overflowBottom = 0;
    } else {
      const d = this.screen.corners.bottomRight.relative_offset.y - this.zone.corners.bottomRight.relative_offset.y;
      this.overscreen.overflowBottom = Math.min(d, this.screen.height);
    }
  
    const targetHeight = this.screen.height + this.overscreen.overflowTop + this.overscreen.overflowBottom;

    // --- IMPORTANT : ne jamais dépasser la zone courante ---
    // On remet à jour les "bases" pour qu'elles ne dépassent pas la zone actuelle
    this.overscreen.width_base  = Math.min(this.overscreen.width_base,  this.zone.width);
    this.overscreen.height_base = Math.min(this.overscreen.height_base, this.zone.height);
  
    // Bornes supérieures : min(3×screen, zone)
    const maxWidth  = Math.min(this.screen.width  * 3, this.zone.width);
    const maxHeight = Math.min(this.screen.height * 3, this.zone.height);
  
    // Bornes inférieures : au moins screen, au moins la base, mais jamais > à la zone
    const minWidth  = Math.min(Math.max(this.screen.width,  this.overscreen.width_base),  maxWidth);
    const minHeight = Math.min(Math.max(this.screen.height, this.overscreen.height_base), maxHeight);
  
    // Valeur finale (dans [min, max]) + sécurité numérique
    this.overscreen.width  = clamp(Math.max(targetWidth,  minWidth),  minWidth,  maxWidth);
    this.overscreen.height = clamp(Math.max(targetHeight, minHeight), minHeight, maxHeight);
  }

  public updateOffset(): void {
    if(this.log){console.log(`overscreen.updateOffset()`);}
    if(this.zone.left < -this.screen.width)
    {
      this.overscreen.left = -this.screen.width;
    } else {
      this.overscreen.left = this.zone.left;
    }

    if(this.zone.top < -this.screen.height)
    {
      this.overscreen.top = -this.screen.height
    } else {
      this.overscreen.top = this.zone.top;
    }
  }

  public updateCorners()
  {
    if(this.log){console.log(`overscreen.updateCorners()`);}

    this.overscreen.corners.topLeft.relative_offset.x = this.screen.center.x - ( this.screen.width/2) - this.overscreen.overflowLeft;
    this.overscreen.corners.topLeft.relative_offset.y =  this.screen.center.y + ( this.screen.height/2) + this.overscreen.overflowTop;

    this.overscreen.corners.topRight.relative_offset.x =  this.screen.center.x + ( this.screen.width/2) + this.overscreen.overflowRight;
    this.overscreen.corners.topRight.relative_offset.y =  this.screen.center.y + ( this.screen.height/2) + this.overscreen.overflowTop;

    this.overscreen.corners.bottomRight.relative_offset.x =  this.screen.center.x + ( this.screen.width/2) + this.overscreen.overflowRight;
    this.overscreen.corners.bottomRight.relative_offset.y =  this.screen.center.y - ( this.screen.height/2) - this.overscreen.overflowBottom;

    this.overscreen.corners.bottomLeft.relative_offset.x =  this.screen.center.x - ( this.screen.width/2) - this.overscreen.overflowLeft;
    this.overscreen.corners.bottomLeft.relative_offset.y =  this.screen.center.y - ( this.screen.height/2) - this.overscreen.overflowBottom;

  }
  
}
