import { ChecksumValidator } from '../../src/validator/ChecksumValidator';

describe('ChecksumValidator', () => {
  it('calculates deterministic SHA-256 hashes', () => {
    const validator = new ChecksumValidator();
    const hash1 = validator.calculate('SELECT 1;');
    const hash2 = validator.calculate('SELECT 1;');
    const hash3 = validator.calculate('SELECT 2;');

    expect(hash1).toEqual(hash2);
    expect(hash1).not.toEqual(hash3);
  });

  it('validates expected checksum', () => {
    const validator = new ChecksumValidator();
    const sql = 'CREATE TABLE users(id INT);';
    const checksum = validator.calculate(sql);

    expect(validator.validate(checksum, sql)).toBe(true);
    expect(validator.validate('bad', sql)).toBe(false);
  });

  it('throws on checksum mismatch', () => {
    const validator = new ChecksumValidator();

    expect(() =>
      validator.validateOrThrow('20260101010101_create_users', 'expected', 'actual'),
    ).toThrow('Checksum mismatch');
  });
});
