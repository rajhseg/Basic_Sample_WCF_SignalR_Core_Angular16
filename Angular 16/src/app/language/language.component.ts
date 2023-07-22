import { ChangeDetectionStrategy, Component, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageComponent {

  isDev!: boolean;
  env!: string;

  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.isDev = isDevMode();
    this.env = environment.apiKey;
  }

  select(value: string) {
    this.translate.use(value);
    console.log(value);
  }
}
