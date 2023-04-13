import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { LayoutComponent } from './views/layout/layout.component';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { NavComponent } from './views/layout/nav/nav.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { SlideMenuModule } from 'primeng/slidemenu';
import { DividerModule } from 'primeng/divider';
import { DialogConfirmationComponent } from './views/dialog-confirmation/dialog-confirmation.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    LayoutComponent,
    WelcomeComponent,
    HeaderComponent,
    NavComponent,
    DialogConfirmationComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    DynamicDialogModule,
    SidebarModule,
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    TranslateModule,
    DropdownModule,
    BadgeModule,
    SlideMenuModule,
    DividerModule,
    DialogModule
  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    DialogService
  ],
})
export class CoreModule { }
