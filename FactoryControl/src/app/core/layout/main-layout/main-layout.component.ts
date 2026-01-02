import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponent,
    SidenavComponent,
    MatSidenavModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
