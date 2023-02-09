import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { appInitializerFactory, HttpLoaderFactory } from './core/utils/translate-initializer';
import { CoreModule } from './core/core.module';
import { SecurityModule } from './security/security.module';
import { ManagementModule } from './management/management.module';
import { AssistanceModule } from './assistance/assistance.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    TranslateModule.forRoot({
      loader :{
        provide : TranslateLoader,
        useFactory : HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CoreModule,
    SecurityModule,
    ManagementModule,
    AssistanceModule,
    QuestionnaireModule
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
