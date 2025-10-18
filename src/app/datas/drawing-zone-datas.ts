import { Injectable } from '@angular/core';
import { Root } from '../interfaces/root';
import { Screen } from '../interfaces/screen';
import { BehaviorSubject } from 'rxjs';
import { Zone } from '../interfaces/zone';
import { map, combineLatest } from 'rxjs';
import { Overscreen } from '../interfaces/overscreen';


const initialRoot: Root = {
  width: 0,
  height: 0,
  corners: {
    topLeft:     {x: 0, y: 0},
    topRight:    {x: 0, y: 0},
    bottomRight: {x: 0, y: 0},
    bottomLeft:  {x: 0, y: 0}
  },
  pointer: {
    absolute_offset: {x: 0, y: 0},
    relative_offset: {x: 0, y: 0}
  },
  pointerInScreen: false
}

const initialScreen: Screen = {
  height: 0,
  width: 0,
  minimizerMode: true,
  minimizerRatio: 10,
  left: 0,
  right: 0,
  corners: {
    topLeft: {
      absolute_offset: {x: 0, y: 0},
      relative_offset: {x: 0, y: 0}
    },
    topRight: {
      absolute_offset: {x: 0, y: 0},
      relative_offset: {x: 0, y: 0}
    },
    bottomRight: {
      absolute_offset: {x: 0, y: 0},
      relative_offset: {x: 0, y: 0}
    },
    bottomLeft: {
      absolute_offset: {x: 0, y: 0},
      relative_offset: {x: 0, y: 0}
    },
  },
  center: {
    absolute_offset: {x: 0, y: 0},
    relative_offset: {x: 0, y: 0}
  }
}

const initialZone: Zone = {
  zoom: 1,
  zoom_max: 4,
  zoom_min: 1,
  zoom_step: 0.1,
  width_base: 0,
  height_base: 0,
  width: 0,
  height: 0,
  left_base: 0,
  top_base: 0,
  left: 0,
  top: 0,
  panX: 0,
  panY: 0,
  panX_max: 0,
  panX_min: 0,
  panY_max: 0,
  panY_min: 0,
  center: {
    absolute_offset: {x: 0, y: 0},
    relative_offset: {x: 0, y: 0}
  },
  corners: {
    topLeft: {
      absolute_offset: {x: 0, y: 0},
      relative_offset: {x: 0, y: 0}
    },
    topRight: {
      absolute_offset: {x: 0, y: 0},
      relative_offset: {x: 0, y: 0}
    },
    bottomRight: {
      absolute_offset: {x: 0, y: 0},
      relative_offset: {x: 0, y: 0}
    },
    bottomLeft: {
      absolute_offset: {x: 0, y: 0},
      relative_offset: {x: 0, y: 0}
    }
  }
}

const initialOverscreen: Overscreen = {
  height: 0,
  width: 0,
  height_base: 0,
  width_base: 0,
  left: 0,
  top: 0,
  corners: {
    topLeft: {
      absolute_offset: {x: 0, y: 0},
      relative_offset: {x: 0, y: 0}
    },
    topRight: {
      absolute_offset: {x: 0, y: 0},
      relative_offset: {x: 0, y: 0}
    },
    bottomRight: {
      absolute_offset: {x: 0, y: 0},
      relative_offset: {x: 0, y: 0}
    },
    bottomLeft: {
      absolute_offset: {x: 0, y: 0},
      relative_offset: {x: 0, y: 0}
    },
  },
  center: {
    absolute_offset: {x: 0, y: 0},
    relative_offset: {x: 0, y: 0}
  },
  overflowLeft: 0,
  overflowRight: 0,
  overflowTop: 0,
  overflowBottom: 0
}

@Injectable({
  providedIn: 'root'
})
export class DrawingZoneDatas {
  
  private readonly root = new BehaviorSubject<Root>(initialRoot);
  public readonly root$ = this.root.asObservable();

  private readonly screen = new BehaviorSubject<Screen>(initialScreen);
  public readonly screen$ = this.screen.asObservable();

  private readonly zone = new BehaviorSubject<Zone>(initialZone);
  public readonly zone$ = this.zone.asObservable();

  private readonly overscreen = new BehaviorSubject<Overscreen>(initialOverscreen);
  public readonly overscreen$ = this.overscreen.asObservable();

  setRoot(value: Root): void {
    this.root.next(value);
  }

  getRoot(): Root {
    return this.root.value;
  }

  setScreen(value: Screen): void {
    this.screen.next(value);
  }

  getScreen(): Screen {
    return this.screen.value;
  }

  setZone(value: Zone): void {
    this.zone.next(value);
  }

  getZone(): Zone {
    return this.zone.value;
  }

  setOverscreen(value: Overscreen): void {
    this.overscreen.next(value);
  }

  getOverscreen(): Overscreen {
    return this.overscreen.value;
  }
}
