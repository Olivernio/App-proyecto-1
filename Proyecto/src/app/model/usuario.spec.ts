import { Usuario } from './usuario';

describe('Usuario', () => {
  it('should create an instance', () => {
    // @ts-ignore: Ignora la advertencia de TypeScript
    expect(new Usuario()).toBeTruthy();
  });
});
