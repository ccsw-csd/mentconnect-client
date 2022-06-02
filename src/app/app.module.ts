import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SecurityModule } from './security/security.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { appInitializerFactory, HttpLoaderFactory } from './core/utils/translate-initializer';
import { AssistanceModule } from './assistance/assistance.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SecurityModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    AssistanceModule,
    TranslateModule.forRoot({
      loader :{
        provide : TranslateLoader,
        useFactory : HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    HttpClientModule,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
