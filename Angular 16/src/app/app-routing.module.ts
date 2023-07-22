import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, Inject, InjectionToken, Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OpencloseComponent } from './animations/openclose/openclose.component';
import { UseanimationComponent } from './animations/useanimation/useanimation.component';
import { ErrorHandlerService } from './ErrorService/error-handler.service';
import { RetryInterceptor } from './interceptor/retry.interceptor';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ConcatmapComponent } from './operartors/concatmap/concatmap.component';
import { MergemapComponent } from './operartors/mergemap/mergemap.component';
import { TakeComponent } from './operartors/take/take.component';
import { BufferComponent } from './operators/buffer/buffer.component';
import { DebounceComponent } from './operators/debounce/debounce.component';
import { GroupComponent } from './operators/group/group.component';
import { ScanComponent } from './operators/scan/scan.component';
import { SampleComponent } from './sample/sample.component';
import MapComponent  from './operators/map/map.component';
import { DbLogger, FileLogger, Logger } from './Logger';
import { async, lastValueFrom, tap } from 'rxjs';
import { ConfigInitService } from './config-init.service';
import { NgChartsModule } from 'ng2-charts';
import { AdminComponent } from './admin/admin.component';
import { CustomPreloadingService } from './services/custom-preloading.service';
import { LanguageComponent } from './language/language.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JquerylibComponent } from './jquerylib/jquerylib.component';
import { HighlightModule, HighlightOptions, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

export const routes: Routes = [
  { path: 'merge', component: MergemapComponent, data: { animation: 'mergePage'} },
  { path: 'concat', loadComponent: () => ConcatmapComponent, data: { animation: 'concatPage' } },
  { path: 'sample', loadComponent: () => SampleComponent, data: { animation: 'samplePage'} },
  { path: 'take', loadComponent: () => TakeComponent, data: { animation: 'takePage'} },
  { path: 'scan', loadComponent: () => ScanComponent, data: { animation: 'scanPage'} },
  { path: 'debounce', loadComponent: () => DebounceComponent, data: { animation: 'debouncePage'} },
  { path: 'buffer', loadComponent: () => BufferComponent, data: { animation: 'bufferPage'} },
  { path: 'group', loadComponent: () => GroupComponent, data: { animation: 'groupPage'} },
  { path: 'openclose', loadComponent: () => OpencloseComponent, data: { animation: 'openclosePage' } },
  { path: 'useani', loadComponent: () => UseanimationComponent, data: { animation: 'useanimatePage' } },
  { path: 'map', loadComponent: () => MapComponent, data: { animation: 'mapPage' } },
  { path: 'admin', loadComponent: () => AdminComponent, loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule), data: { preload: false } },
  { path: 'lang', loadComponent: () => LanguageComponent },
  { path: 'jquery', loadComponent: () => JquerylibComponent }
];

const ENV_TOKEN: InjectionToken<string> = new InjectionToken<string>('Env_token');

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingService }),
    NgChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => { return new TranslateHttpLoader(http) },
        deps: [HttpClient]
      }
    }),
    HighlightModule
  ],
  exports: [RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RetryInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide:'apiurl',
      //useValue: 'https://reqres.in/'
      useValue:''
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (http: HttpClient, configService: ConfigInitService, inject: Injector) => {

        let apiUrl = inject.get('apiurl');

        //return () => {

        //  const req$ = http.get(apiUrl + 'api/users/2').pipe(tap((x: any) => {

        //    let id = x.data.id;
        //    if (id == 2) {
        //      configService.SetEnvironment('Dev');
        //    } else {
        //      configService.SetEnvironment('Test');
        //    }

        //  }));

        //  return lastValueFrom(req$);
        //};

        return () => {
          configService.SetEnvironment('Dev');
        };
      },
      multi: true,
      deps: [HttpClient, ConfigInitService, Injector]
    },
    {
      provide: ENV_TOKEN,
      useFactory: (config: ConfigInitService) => {
        return config.GetEnvironment();
      },
      deps: [ConfigInitService]
    },
    {
      provide: Logger,
      useFactory: (inject: Injector) => {
        let token = inject.get(ENV_TOKEN);
        let env = token;
        return env == 'Dev' ? new FileLogger() : new DbLogger();
      },
      deps: [Injector],
      multi: false
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        lineNumbers: true,
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
       // themePath: '/node_modules/highlight.js/styles/github.css',
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          javascript: () => import('highlight.js/lib/languages/javascript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
        },
      },
    },
  ]
})
export class AppRoutingModule { }
