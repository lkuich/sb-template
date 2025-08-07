import buildPath from '.';

describe('buildPath', () => {
  it('should join multiple path segments correctly', () => {
    const result = buildPath('blog', 'slug');
    expect(result).toBe('blog/slug');
  });

  it('should handle undefined values gracefully', () => {
    const result = buildPath('blog', 'slug');
    expect(result).toBe('blog/slug');
  });

  it('should remove leading slashes from segments', () => {
    const result = buildPath('/blog', '/slug');
    expect(result).toBe('blog/slug');
  });

  it('should return an empty string if all arguments are undefined', () => {
    const result = buildPath(undefined, undefined);
    expect(result).toBe('');
  });

  it('should handle a mix of valid and undefined segments', () => {
    const result = buildPath('blog', undefined, 'slug');
    expect(result).toBe('blog/slug');
  });

  it('should handle an empty argument list', () => {
    const result = buildPath();
    expect(result).toBe('');
  });
});
