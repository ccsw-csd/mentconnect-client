import { LOCATION_INITIALIZED } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "./translate-http-loader";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", [
        "primeng",
        "security/login",
        "core/layout/menu",
        "core/layout/welcome",
        "questionnaire",
        "assistance/patient-discharge",
        "assistance/patient-list",
        "assistance/patient-edit",
        "assistance/patient-evaluation",
        "assistance/patient-diary",
        "management/users",
        "questionnaire/questionnaire-list"
    ]);
  };

export function appInitializerFactory(translate: TranslateService, injector: Injector) {

    return () => new Promise<any>((resolve: any) => {
        const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
        locationInitialized.then(() => {

            const langToSet = getUserLocale();

            translate.setDefaultLang(langToSet);
            translate.use(langToSet).subscribe({
                complete: () => {resolve(null);},
            });
        });
    });
}


function localeNotSupported(locale : string) : boolean {
    if (locale == 'es') return false;
    if (locale == 'en') return false;
    if (locale == 'ca') return false;

    return true;
}


function getUserLocale() : string {

    let userLocale = localStorage.getItem('userLocale');

    if (userLocale == null)
        userLocale = navigator.language.substring(0,2);

    if (localeNotSupported(userLocale))
        userLocale = 'en';

    localStorage.setItem('userLocale', userLocale);

    return userLocale;
}
