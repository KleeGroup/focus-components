import ButtonBackToTop from '../';
const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

describe('Select ButtonBackToTop Component', () => {
    describe('Rendering', () => {
        describe('When a default button-back-to-top is rendered', () => {
            let renderedButtonBackToTop, arr;
            before(() => {
                renderedButtonBackToTop = renderIntoDocument(<ButtonBackToTop />);
                renderedButtonBackToTop.setState({isVisible: true})
                arr = scryRenderedDOMComponentsWithTag(renderedButtonBackToTop, 'button');
            });
            it('should have the material button className and a FAB attribute', () => {
                expect(arr[0].className).to.equal('mdl-button mdl-button--colored mdl-button--fab');
            });
        });
    });
});
