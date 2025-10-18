import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Corners } from '../../interfaces/corners';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Point } from '../../interfaces/point';
import { Screen } from '../../services/screen';
import { DrawingZoneDatas } from '../../datas/drawing-zone-datas';
import { Zone } from '../../services/zone';
import { Overscreen } from '../../services/overscreen';

@Component({
  selector: 'app-drawing-zone',
  imports: [DecimalPipe, CommonModule],
  templateUrl: './drawing-zone.html',
  styleUrl: './drawing-zone.scss'
})
export class DrawingZone {

  @ViewChild('componentRoot', {static: true}) componentRoot!: ElementRef<HTMLElement>;
  @ViewChild('pointerDiv', {static: true}) pointerDiv!: ElementRef<HTMLElement>;
  @ViewChild('screenDiv', {static: true}) screenDiv!: ElementRef<HTMLElement>;

  public root!: any;
  public screen!: any;
  public zone!: any;
  public log: boolean = true;
  public appReady: boolean = false;
  public overscreen!: any;

  private isPanning: boolean = false;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    public datas: DrawingZoneDatas,
    public _screen: Screen,
    public _zone: Zone,
    public _overscreen: Overscreen
  ){
    if(this.log){console.log('drawing-zone.constructor()');
    }
    this.root = this.datas.getRoot();

    this.datas.screen$.subscribe((value) => {
      this.screen = value;
      
      if(this.log){console.log('drawing-zone.screen$.subscribe')};
      if(this.log){console.log(this.screen)};
    })

    this.datas.zone$.subscribe((value) => {
      this.zone = value;

      if(this.log){console.log('drawing-zone.zone$.subscribe')};
      if(this.log){console.log(this.zone)};
    })

    this.datas.overscreen$.subscribe((value) => {
      this.overscreen = value;

      if(this.log){console.log('drawing-zone.overscreen$.subscribe')};
      if(this.log){console.log(this.zone)};
    })
  }

  ngAfterViewInit(): void {
    if(this.log){console.log('drawing-zone.ngAfterViewInit()')};
    let rect = this.componentRoot.nativeElement.getBoundingClientRect();
    this.initRoot(rect.width, rect.height);
    this.initCorners();
    this.initScreen();
    this.initZone();
    this.initOverscreen();

    this.cdr.detectChanges();
  }

  initRoot(width: number, height: number) : void {
    this.root.width = width;
    this.root.height = height;

    if(this.log){console.log('drawing-zone.initRoot()');}
    this.datas.setRoot(this.root);
  }

  initCorners(): void {
    this.root.corners.topLeft.x = 0;
    this.root.corners.topLeft.y = 0;

    this.root.corners.topRight.x = this.root.width;
    this.root.corners.topRight.y = 0;

    this.root.corners.bottomRight.x = this.root.width;
    this.root.corners.bottomRight.y = this.root.height;

    this.root.corners.bottomLeft.x = 0;
    this.root.corners.bottomLeft.y = this.root.height;

    if(this.log){console.log('drawing-zone.initCorners()');}
    this.datas.setRoot(this.root);
  }

  initScreen(): void {
    if(this.log){console.log('drawing-zone.initScreen()');}
    this._screen.init();
  }

  initZone(): void {
    if(this.log){console.log('drawing-zone.initZone()');}
    this._zone.init();
  }

  initOverscreen(): void {
    if(this.log){console.log('drawing-zone.initOverscreen()');}
    this._overscreen.init();
  }

  @HostListener('document:wheel', ['$event'])
  onWheel(ev: WheelEvent): void {
    if(ev.ctrlKey) return;
    const delta = ev.deltaY < 0 ? +1 : -1;
    this._zone.updateZoom(delta);
    this._screen.applyZoom();
    this._overscreen.applyZoom();
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(ev: MouseEvent): void {
    if (ev.button !== 0) return;

    const ax = ev.clientX, ay = ev.clientY;
    const left   = this.screen.left;
    const top    = this.screen.top;
    const right  = left + this.screen.width;
    const bottom = top  + this.screen.height;
    const inside = ax >= left && ax <= right && ay >= top && ay <= bottom;
    if (!inside) { this.isPanning = false; return; }

    ev.preventDefault();
    this.isPanning = true;
    this.lastMouseX = ax;
    this.lastMouseY = ay;
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isPanning = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(ev: MouseEvent): void {
    // if(this.log){console.log('drawing-zone.onMouseMove()');}

    const ax = ev.clientX, ay = ev.clientY;

    this.root.pointer.absolute_offset.x = ax;
    this.root.pointer.absolute_offset.y = ay;

    const left   = this.screen.left;
    const top    = this.screen.top;
    const right  = left + this.screen.width;
    const bottom = top  + this.screen.height;
    const inside = ax >= left && ax <= right && ay >= top && ay <= bottom;

    this.root.pointerInScreen = inside;
    this.datas.setRoot(this.root);

    if (!inside) {
      this.isPanning = false;
      this.lastMouseX = ax;
      this.lastMouseY = ay;
      return;
    }

    if (this.isPanning) {
      const dx = ax - this.lastMouseX;
      const dy = ay - this.lastMouseY;
      ev.preventDefault();
      this._zone.updatePan(dx, -dy);
      this._screen.applyPan();
      // this._overscreen.applyPan();
    }

    this.lastMouseX = ax;
    this.lastMouseY = ay;
  }
}
