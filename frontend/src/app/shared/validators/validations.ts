import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static cnpjValidator(control: AbstractControl): ValidationErrors | null {
    const cnpj = control.value.replace(/\D/g, '');
    if (cnpj.length !== 14) {
      return { cnpjNotValid: true };
    }
    return null;
  }

  static dateFoundedValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const date = new Date(control.value);
    if (date > new Date()) {
      return { dateFoundedInFuture: true };
    }
    return null;
  }

  static cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value.replace(/\D/g, '');
    if (cpf.length !== 11) {
      return { cpfNotValid: true };
    }
    return null;
  }

  static dateOfBirthValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const date = new Date(control.value);
    const today = new Date();
    const tenYearsAgo = new Date(
      today.getFullYear() - 10,
      today.getMonth(),
      today.getDate(),
    );
    if (date > tenYearsAgo) {
      return { dateOfBirthNotOldEnough: true };
    }
    return null;
  }
}
