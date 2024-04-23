import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesFormComponent } from './clases-form.component';

describe('ClasesFormComponent', () => {
  let component: ClasesFormComponent;
  let fixture: ComponentFixture<ClasesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClasesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
