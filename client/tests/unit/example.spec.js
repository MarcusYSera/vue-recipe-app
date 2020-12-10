import { expect } from 'chai';
// import { shallowMount } from '@vue/test-utils';
// import HelloWorld from '@/components/HelloWorld.vue';
import Schedule from '@/views/Schedule.vue';
import Calendar from '@/components/schedule/Calendar.vue';

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message';
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg },
//     });
//     expect(wrapper.text()).to.include(msg);
//   });
// });
describe('Schedule.vue', () => {
  it('contains component calendar', () => {
    expect(Schedule.find(Calendar).exists()).to.be.true;
  });
});
