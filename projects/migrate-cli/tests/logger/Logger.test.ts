import { Logger } from '../../src/logger/Logger';

jest.mock('winston', () => {
  const mockCreateLogger = jest.fn();
  const mockFormat = {
    timestamp: jest.fn(() => 'timestamp'),
    json: jest.fn(() => 'json'),
    printf: jest.fn(() => 'printf'),
    combine: jest.fn(() => 'combine'),
  };
  const mockTransports = {
    Console: jest.fn(),
    File: jest.fn(),
  };

  return {
    createLogger: (...args: unknown[]) => mockCreateLogger(...args),
    format: mockFormat,
    transports: mockTransports,
    __mocks: { mockCreateLogger, mockFormat, mockTransports },
  };
});

describe('Logger', () => {
  const mocks = jest.requireMock('winston').__mocks as {
    mockCreateLogger: jest.Mock;
    mockFormat: {
      timestamp: jest.Mock;
      json: jest.Mock;
      printf: jest.Mock;
      combine: jest.Mock;
    };
    mockTransports: { Console: jest.Mock; File: jest.Mock };
  };

  beforeEach(() => {
    mocks.mockCreateLogger.mockReset();
    mocks.mockFormat.timestamp.mockClear();
    mocks.mockFormat.json.mockClear();
    mocks.mockFormat.printf.mockClear();
    mocks.mockFormat.combine.mockClear();
    mocks.mockTransports.Console.mockClear();
    mocks.mockTransports.File.mockClear();

    mocks.mockCreateLogger.mockReturnValue({
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    });
  });

  it('creates JSON logger with console transport', () => {
    new Logger({ level: 'info', format: 'json' });

    expect(mocks.mockCreateLogger).toHaveBeenCalled();
    expect(mocks.mockFormat.json).toHaveBeenCalled();
    expect(mocks.mockTransports.Console).toHaveBeenCalled();
  });

  it('adds file transport when configured', () => {
    new Logger({ level: 'debug', format: 'text', outputFile: 'app.log' });

    expect(mocks.mockTransports.File).toHaveBeenCalledWith({ filename: 'app.log' });
  });

  it('routes log methods to winston logger', () => {
    const logger = new Logger({ level: 'info', format: 'text' });
    logger.debug('debug');
    logger.info('info');
    logger.warn('warn');
    logger.error('error');

    const instance = mocks.mockCreateLogger.mock.results[0]?.value as {
      debug: jest.Mock;
      info: jest.Mock;
      warn: jest.Mock;
      error: jest.Mock;
    };

    expect(instance.debug).toHaveBeenCalled();
    expect(instance.info).toHaveBeenCalled();
    expect(instance.warn).toHaveBeenCalled();
    expect(instance.error).toHaveBeenCalled();
  });
});
