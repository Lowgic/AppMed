import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImagesForm2Page } from './images-form2.page';

describe('ImagesForm2Page', () => {
  let component: ImagesForm2Page;
  let fixture: ComponentFixture<ImagesForm2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesForm2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagesForm2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
