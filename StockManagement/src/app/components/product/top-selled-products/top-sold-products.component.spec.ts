import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSoldProductsComponent } from './top-sold-products.component';

describe('TopSelledProductsComponent', () => {
  let component: TopSoldProductsComponent;
  let fixture: ComponentFixture<TopSoldProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSoldProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSoldProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
