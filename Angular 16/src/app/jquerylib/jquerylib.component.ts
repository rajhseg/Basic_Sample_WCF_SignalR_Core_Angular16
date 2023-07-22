import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as $ from 'jquery';

import {
  HighlightAutoResult,
  HighlightLoader,
  HighlightModule,
  HighlightOptions,
  HIGHLIGHT_OPTIONS,
} from 'ngx-highlightjs';

import hljs from 'highlight.js';

const themeAndroidStudio: string = 'assets/androidstudio.css';
const themeGradient: string = 'assets/gradient-dark.css'

@Component({
  selector: 'app-jquerylib',
  standalone: true,
  imports: [CommonModule, HighlightModule],
  templateUrl: './jquerylib.component.html',
  styleUrls: ['./jquerylib.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    
  ]
})
export class JquerylibComponent implements OnInit {

  code = '';
  theme: string = '';
  htmlCode = `
 <div id="subcontainer">
    <div>
      <p>Para1</p>
      <p>Para2</p>
      <p id="para3">Para3</p>
      <p>Para4</p>
      <p>Para5</p>
      <ul>
        <li>list1</li>
        <li id="list1">list2</li>
        <li>
          list 3
          <ol>
            <li>list 4</li>
            <li id="list">list 5</li>
          </ol>
        </li>
      </ul>
    </div>
  </div>`;

  @ViewChild('loginContainer', { read: ElementRef, static: true }) loginEle!: ElementRef;

  constructor(private hljsLoader: HighlightLoader) {
  
  }

  openJavascript(evt: any, type: string) {
    var i, tabcontent: any, tablinks;

    if (this.theme == "") {
      this.theme = themeAndroidStudio;
    }

    
    if (type == 'javascript') {
      $('#codecontainer').text(this.code);     
    } else {
      $('#codecontainer2').text(this.htmlCode);
    }

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active1", "");
    }

  

    $('#' + type).css('display', "block");
    if (evt != null) {
      evt.currentTarget.className += " active1";
    }
    else {
      $('.tab').children('button').eq(0).addClass('active1');
    }
    this.hljsLoader.setTheme(this.theme);
    hljs.highlightAll();
  }

  changeTheme(evt: any) {
    console.log(evt.target.value);
    this.theme = (evt.target.value == 0) ? themeGradient : themeAndroidStudio;
    this.hljsLoader.setTheme(this.theme);
    hljs.highlightAll();
  }

  writeCode(value: string) {
    this.code = value;
    $('#codecontainer').text(value);
    console.log(this.code);
   
    this.hljsLoader.setTheme(themeAndroidStudio);
    hljs.highlightAll();
    this.openJavascript(null, 'javascript');
  }

  ngOnInit(): void {
    
    this.hljsLoader.setTheme(themeGradient);

    console.log('init');
    console.log(this.loginEle);
    let ins = this;

    $(document).ready(function () {
      $("#loginContainer").focusin(function () {       
        $(this).css('background-color', 'orange');
      });

      $('#loginContainer').focusout(function () {
        $(this).css('background-color', 'white');
      });

      $('input').on('click dblclick', function () {
        
      });

      $('#btnRemove').click(function () {
        $('input').off('click dblclick');
        // $('input').toggle();
        $('input').select(function () {

        });
      });

      $('#refresh').click(function () {
        document.location.reload();
      });

      $('#loginContainer').find('input').each((index, ele) => {
        console.log('index ' + index);
        console.log(ele);      
      });

      $('#find').click(function () {
        $('p').css('border', '1px solid orange');
        ins.writeCode(`
          $('#find').click(function () {
            $('p').css('border', '1px solid orange');
          });
        `)
      });

      $('#closet').click(function () {
        $('#para3').closest('div').css('border', '1px solid orange');

        ins.writeCode(`
          $('#closet').click(function () {
            $('#para3').closest('div').css('border', '1px solid orange');
          });
        `)
      });

      $('#parent').click(function () {
        $('p').parent('div').css('border', '1px solid orange');

        ins.writeCode(`
          $('#parent').click(function () {
            $('p').parent('div').css('border', '1px solid orange');
          });
        `)
      });

      $('#parents').click(function () {
        $('p').parents('div').css('border', '1px solid orange');

        ins.writeCode(`
          $('#parents').click(function () {
            $('p').parents('div').css('border', '1px solid orange');
          });
        `)
      });

      $('#parentuntil').click(function () {
        $('#list').parentsUntil('#subcontainer').css('border', '1px solid orange');

        ins.writeCode(`
           $('#parentuntil').click(function () {
                  $('#list').parentsUntil('#subcontainer').css('border', '1px solid orange');
          });
        `);
      });

      $('#before').click(function () {
        $('#para3').before("<p style=\"color:red;\">Hello world!</p>").css('border', '1px solid orange');

        ins.writeCode(`
            $('#before').click(function () {
                    $('#para3').before("<p style=\"color:red;\">Hello world!</p>").css('border', '1px solid orange');
            });
        `);
      });


      $('#after').click(function () {
        $('#para3').after("<p style=\"color:red;\">Hello world!</p>").css('border', '1px solid orange');

        ins.writeCode(`
           $('#after').click(function () {
                  $('#para3').after("<p style=\"color:red;\">Hello world!</p>").css('border', '1px solid orange');
           });
        `);
      });

      $('#fadein').click(function () {
        $('#para3').fadeIn();

        ins.writeCode(`
           $('#fadein').click(function () {
                  $('#para3').fadeIn();
           });
        `);
      });

      $('#fadeout').click(function () {
        $('#para3').fadeOut();

        ins.writeCode(`
            $('#fadeout').click(function () {
                    $('#para3').fadeOut();
            });
        `);
      });

      $('#fadetoggle').click(function () {
        $('#para3').fadeToggle();

        ins.writeCode(`
           $('#fadetoggle').click(function () {
                  $('#para3').fadeToggle();
            });
        `);
      });

      $('#children').click(function () {
        $('ul').children().css('border', '1px solid orange');

        ins.writeCode(`
          $('#children').click(function () {
            $('ul').children().css('border', '1px solid orange');
          });
        `);
      });

      $('#remove').click(function () {
        $('ul').remove();

        ins.writeCode(`
            $('#remove').click(function () {
              $('ul').remove();
            });
        `);
      });

      $('#filter').click(function () {
        $('p').filter('#para3').css('border', '1px solid orange');

        ins.writeCode(`
            $('#filter').click(function () {
                    $('p').filter('#para3').css('border', '1px solid orange');
            });
        `);
      });

      $('#not').click(function () {
        $('p').not('#para3').css('border', '1px solid orange');

        ins.writeCode(`
            $('#not').click(function () {
              $('p').not('#para3').css('border', '1px solid orange');
            });
        `);
      });

      $('#attr').click(function () {
        $('#para3').attr('id', 'para4').css('border', '1px solid orange');

        ins.writeCode(`
            $('#attr').click(function () {
              $('#para3').attr('id', 'para4').css('border', '1px solid orange');
            });
        `);
      });

      $('#prop').click(function () {
        $('#para3').prop('id', 'para4').css('border', '1px solid orange');

        ins.writeCode(`
            $('#prop').click(function () {
              $('#para3').prop('id', 'para4').css('border', '1px solid orange');
            });
        `)
      });

      $('#end').click(function () {
        $('ul').find('#list1').css('border', '1px solid orange').end()
          .find('ol').css('border', '1px solid orange');

        ins.writeCode(`
            $('#end').click(function () {
              $('ul').find('#list1').css('border', '1px solid orange').end()
              .find('ol').css('border', '1px solid orange');
            });
        `)
      });

      $('#slideup').click(function () {
        $('ul').slideUp();

        ins.writeCode(`          
            $('#slideup').click(function () {
              $('ul').slideUp();
            });
        `);

      });

      $('#slidedown').click(function () {
        $('ul').slideDown();

        ins.writeCode(`
            $('#slidedown').click(function () {
              $('ul').slideDown();
            });
        `);
      });

      $('#slidetoggle').click(function () {
        $('ul').slideToggle();

        ins.writeCode(`
          $('#slidetoggle').click(function () {
            $('ul').slideToggle();
          });
        `)
      });

      $('#eq').click(function () {
        $('p').eq(2).css('border', '1px solid orange');

        ins.writeCode(`
            $('#eq').click(function () {
              $('p').eq(2).css('border', '1px solid orange');
            })
        `);
      });

      $('#even').click(function () {
        $('p').even().css('border', '1px solid orange');

        ins.writeCode(`
            $('#even').click(function () {
              $('p').even().css('border', '1px solid orange');
            });
        `);
      });

      $('#odd').click(function () {
        $('p').odd().css('border', '1px solid orange');

        ins.writeCode(`
            $('#odd').click(function () {
              $('p').odd().css('border', '1px solid orange');
            });
        `);
      });

      $('#next').click(function () {
        $('#para3').next().css('border', '1px solid orange');

        ins.writeCode(`
            $('#next').click(function () {
              $('#para3').next().css('border', '1px solid orange');
            });
        `);
      });

      $('#nextall').click(function () {
        $('#para3').nextAll().css('border', '1px solid orange');

        ins.writeCode(`
            $('#nextall').click(function () {
              $('#para3').nextAll().css('border', '1px solid orange');
            });
        `);

      });

      $('#prev').click(function () {
        $('#para3').prev().css('border', '1px solid orange');

        ins.writeCode(`
            $('#prev').click(function () {
              $('#para3').prev().css('border', '1px solid orange');
            });
        `);
      });

      $('#prevall').click(function () {
        $('#para3').prevAll().css('border', '1px solid orange');

        ins.writeCode(`
             $('#prevall').click(function () {
              $('#para3').prevAll().css('border', '1px solid orange');
            });
        `);
      });

      $('#contents').click(function () {

        $('#subcontainer').contents().filter('#para3').wrap('<b />');

        ins.writeCode(`
          $('#contents').click(function () {
            $('#subcontainer').contents().filter('#para3').wrap('<b />');
          });
        `);
      });
      
      $('#wrap').click(()=>{
        $('#para3').wrap('<b/>').css('color', 'red');
        
        ins.writeCode(`
             $('#wrap').click(function () {
                $('#para3').wrap('<b/>').css('color','red');
              });
        `);

      })


      $('#append').click(function () {
        $('ul').append('<li>append list item</li>');

        ins.writeCode(`
           $('#append').click(function () {
              $('ul').append('<li>append list item</li>');
           });
        `);

      });

      $('#prepand').click(function () {
        $('ul').prepend('<li>prepand list item</li>');

        ins.writeCode(`
          $('#prepand').click(function () {
              $('ul').prepend('<li>prepand list item</li>');            
          });
        `);
        
      })

    });
  }

}
