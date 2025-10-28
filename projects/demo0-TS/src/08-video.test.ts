import { video } from './08-video.js';

describe('video', () => {
    beforeEach(() => {
        vi.spyOn(video, 'play');
    });

    test('play should return true', () => {
        const result = video.play();
        expect(video.play).toHaveBeenCalled();
        expect(result).toBe(true);
    });
});
