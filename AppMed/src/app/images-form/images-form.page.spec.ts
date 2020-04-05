import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImagesFormPage } from './images-form.page';

describe('ImagesFormPage', () => {
  let component: ImagesFormPage;
  let fixture: ComponentFixture<ImagesFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagesFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
