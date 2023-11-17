import Button from './Button.vue';
import { mount } from '@vue/test-utils';
describe('test button', () => {
    it('display text', () => {
        const content = 'Sheng';
        const wrapper = mount(Button, {
            slots: {
                default: content
            }
        });
        expect(wrapper.text()).toBe(content);
    });
    it('button size', () => {
        const size = 'small';
        const wrapper = mount(Button, {
            props: {
                size
            }
        });
        expect(wrapper.classes()).toContain('el-button--small');
    });
});
//# sourceMappingURL=Button.spec.js.map