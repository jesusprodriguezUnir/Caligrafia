import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SecretTrigger } from '../SecretTrigger';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('SecretTrigger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should register keydown event listener on mount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    render(<SecretTrigger />);
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should remove keydown event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<SecretTrigger />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should navigate to admin when Ctrl+Alt+A is pressed', async () => {
    const user = userEvent.setup();
    render(<SecretTrigger />);

    await user.keyboard('{Control>}{Alt>}{a}');

    expect(mockPush).toHaveBeenCalledWith('/admin/pdf-manager');
  });

  it('should not navigate when only Ctrl is pressed', async () => {
    const user = userEvent.setup();
    render(<SecretTrigger />);

    await user.keyboard('{Control>}{a}');

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should not navigate when only Alt is pressed', async () => {
    const user = userEvent.setup();
    render(<SecretTrigger />);

    await user.keyboard('{Alt>}{a}');

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should be case insensitive for the key', async () => {
    const user = userEvent.setup();
    render(<SecretTrigger />);

    await user.keyboard('{Control>}{Alt>}{A}');

    expect(mockPush).toHaveBeenCalledWith('/admin/pdf-manager');
  });

  it('should not navigate on wrong key combination', async () => {
    const user = userEvent.setup();
    render(<SecretTrigger />);

    await user.keyboard('{Control>}{Alt>}{b}');

    expect(mockPush).not.toHaveBeenCalled();
  });
});
