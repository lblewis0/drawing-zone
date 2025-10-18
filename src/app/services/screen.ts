import { Injectable } from '@angular/core';
import { DrawingZoneDatas } from '../datas/drawing-zone-datas';
import { map, distinctUntilChanged} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class Screen {

  public log: boolean = true;
  public screen!: any;
  public root!: any;
  public zone!: any;

  constructor(
    public datas: DrawingZoneDatas
  ){
    if(this.log){console.log('screen.constructor()');}
    this.root = this.datas.getRoot();
    this.screen = this.datas.getScreen();

    this.datas.zone$.subscribe((value) => {
      this.zone = value;

      if(this.log){console.log('screen.zone$.subscribe()');}
    })
  }

  public getRoot(): void {
    this.root = this.datas.getRoot();
  }

  public init(): void {
    this.getRoot();

    this.initSize();
    this.initOffsets();
    this.initCenterPoint();
    this.initCorners();

    this.datas.setScreen(this.screen);
  }

  public initSize(): void {
    if(this.log){console.log(`screen.initSize(${this.root.width}, ${this.root.height})`);}

    if(this.screen.minimizerMode){
      this.screen.width = this.root.width/this.screen.minimizerRatio;
      this.screen.height = this.root.height/this.screen.minimizerRatio;
    } else {
      this.screen.width = this.root.width;
      this.screen.height = this.root.height;
    }
  }

  public initOffsets(): void {
    if(this.log){console.log("screen.initOffsets()")};

    this.screen.left = (this.root.width - this.screen.width)/2;
    this.screen.top = (this.root.height - this.screen.height)/2;
  }

  public initCenterPoint(): void {
    if(this.log){console.log("screen.initCenterPoint()")};
    this.screen.center.absolute_offset.x = ((this.root.width - this.screen.width)/2)+(this.screen.width/2);
    this.screen.center.absolute_offset.y = ((this.root.height - this.screen.height)/2)+(this.screen.height/2);
    this.screen.center.relative_offset.x = 0;
    this.screen.center.relative_offset.y = 0;
  }

  public initCorners(): void {
    if(this.log){console.log("screen.initCorners()")};
    this.screen.corners.topLeft.absolute_offset.x = ((this.root.width - this.screen.width)/2);
    this.screen.corners.topLeft.absolute_offset.y = ((this.root.height - this.screen.height)/2);
    this.screen.corners.topLeft.relative_offset.x = -(this.screen.width/2);
    this.screen.corners.topLeft.relative_offset.y = (this.screen.height/2);

    this.screen.corners.topRight.absolute_offset.x = ((this.root.width - this.screen.width)/2) + this.screen.width;
    this.screen.corners.topRight.absolute_offset.y = ((this.root.height - this.screen.height)/2);
    this.screen.corners.topRight.relative_offset.x = (this.screen.width/2);
    this.screen.corners.topRight.relative_offset.y = (this.screen.height/2);

    this.screen.corners.bottomRight.absolute_offset.x = ((this.root.width - this.screen.width)/2) + this.screen.width;
    this.screen.corners.bottomRight.absolute_offset.y = ((this.root.height - this.screen.height)/2) + this.screen.height;
    this.screen.corners.bottomRight.relative_offset.x = (this.screen.width/2);
    this.screen.corners.bottomRight.relative_offset.y = -(this.screen.height/2);

    this.screen.corners.bottomLeft.absolute_offset.x = ((this.root.width - this.screen.width)/2);
    this.screen.corners.bottomLeft.absolute_offset.y = ((this.root.height - this.screen.height)/2) + this.screen.height;
    this.screen.corners.bottomLeft.relative_offset.x = -(this.screen.width/2);
    this.screen.corners.bottomLeft.relative_offset.y = -(this.screen.height/2);
  }

  public applyZoom(): void {
    if(this.log){console.log("screen.applyZoom()")};

    this.updateCenterPoint();
    this.updateCorners();
  }

  public applyPan(): void {
    if(this.log){console.log("screen.applyPan()")};

    this.updateCenterPoint();
    this.updateCorners();
  }

  public updateCenterPoint(): void {
    if(this.log){console.log("screen.updateCenterPoint()")};

    this.screen.center.relative_offset.x = -this.zone.panX;
    this.screen.center.relative_offset.y = -this.zone.panY;

  }

  public updateCorners(): void {
    if(this.log){console.log("screen.updateCorners()")};

    this.screen.corners.topLeft.relative_offset.x = -(this.screen.width/2) -this.zone.panX;
    this.screen.corners.topLeft.relative_offset.y = (this.screen.height/2) -this.zone.panY;

    this.screen.corners.topRight.relative_offset.x = (this.screen.width/2) -this.zone.panX;
    this.screen.corners.topRight.relative_offset.y = (this.screen.height/2) -this.zone.panY;

    this.screen.corners.bottomRight.relative_offset.x = (this.screen.width/2) -this.zone.panX;
    this.screen.corners.bottomRight.relative_offset.y = -(this.screen.height/2) -this.zone.panY;

    this.screen.corners.bottomLeft.relative_offset.x = -(this.screen.width/2) -this.zone.panX;
    this.screen.corners.bottomLeft.relative_offset.y = -(this.screen.height/2) -this.zone.panY;

  }


}
