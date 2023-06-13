// import { ComponentFixture, TestBed, async } from '@angular/core/testing';

// import { AuthComponent } from './auth.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// describe('AuthComponent', () => {
//   let component: AuthComponent;
//   let fixture: ComponentFixture<AuthComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [AuthComponent],
//       imports: [FormsModule, ReactiveFormsModule],
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AuthComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have a login form', () => {
//     expect(component.loginForm).toBeDefined();
//   });

//   it('should emit submit event on form submission', () => {
//     spyOn(component.onSubmitForm, 'emit');
//     component.controls['login'].setValue('test');
//     component.controls['password'].setValue('test123');
//     expect(component.onSubmitForm.emit).toHaveBeenCalledWith({
//       login: 'test',
//       password: 'test123'
//     });
//   });

//   it('should have a required login field', () => {
//     const login = component.controls['login'];
//     expect(login.valid).toBeFalsy();

//     login.setValue('test');
//     expect(login.valid).toBeTruthy();

//     login.setValue('');
//     expect(login.valid).toBeFalsy();
//   });

//   it('should have a minlength login field', () => {
//     const login = component.controls['login'];

//     login.setValue('t');
//     expect(login.hasError('minlength')).toBeTruthy();

//     login.setValue('testtesttesttesttest');
//     expect(login.hasError('minlength')).toBeFalsy();
//   });

//   it('should have a maxlength login field', () => {
//     const login = component.controls['login'];

//     login.setValue('testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest');
//     expect(login.hasError('maxlength')).toBeTruthy();

//     login.setValue('testtesttesttesttesttesttesttesttesttesttest');
//     expect(login.hasError('maxlength')).toBeFalsy();
//   });

//   it('should have a valid login field', () => {
//     const login = component.controls['login'];

//     login.setValue('test123');
//     expect(login.hasError('login')).toBeTruthy();

//     login.setValue('Test_Test-123');
//     expect(login.hasError('login')).toBeFalsy();
//   });

//   it('should have a required password field', () => {
//     const password = component.controls['password'];
//     expect(password.valid).toBeFalsy();

//     password.setValue('test');
//     expect(password.valid).toBeTruthy();

//     password.setValue('');
//     expect(password.valid).toBeFalsy();
//   });

//   it('should have a minlength password field', () => {
//     const password = component.controls['password'];

//     password.setValue('t');
//     expect(password.hasError('minlength')).toBeTruthy();

//     password.setValue('testtesttesttesttest');
//     expect(password.hasError('minlength')).toBeFalsy();
//   });

//   it('should have a maxlength password field', () => {
//     const password = component.controls['password'];

//     password.setValue('testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest');
//     expect(password.hasError('maxlength')).toBeTruthy();

//     password.setValue('testtesttesttesttesttesttesttesttesttesttest');
//     expect(password.hasError('maxlength')).toBeFalsy();
//   });

//   it('should have a valid password field', () => {
//     const password = component.controls['password'];

//     password.setValue('testtesttesttest');
//     expect(password.hasError('password')).toBeTruthy();

//     password.setValue('Test1234');
//     expect(password.hasError('password')).toBeFalsy();
//   });

//   it('should display login error message', () => {
//     const login = component.controls['login'];

//     login.setValue('');
//     expect(component.getLoginErrorMessage()).toEqual('Field has been required');

//     login.setValue('t');
//     expect(component.getLoginErrorMessage()).toEqual('Minimum symbol 4');

//     login.setValue('testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest');
//     expect(component.getLoginErrorMessage()).toEqual('Maximum symbol 40');

//     login.setValue('test_test-123');
//     expect(component.getLoginErrorMessage()).toEqual('');
//   });

//   it('should display password error message', () => {
//     const password = component.controls['password'];

//     password.setValue('');
//     expect(component.getPasswordErrorMessage()).toEqual('Field has been required');

//     password.setValue('t');
//     expect(component.getPasswordErrorMessage()).toEqual('Minimum symbol 8');

//     password.setValue('testtesttesttesttest');
//     expect(component.getPasswordErrorMessage()).toEqual('Maximum symbol 20');

//     password.setValue('test');
//     expect(component.getPasswordErrorMessage()).toEqual('Password must contain latin letters, at least one number and one uppercase letter');

//     password.setValue('Test1234');
//     expect(component.getPasswordErrorMessage()).toEqual('');
//   });
// });
