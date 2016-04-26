import Button from '../';
const {renderIntoDocument, Simulate} = TestUtils;

describe('Button Component', () => {
    describe('Rendering', () => {
        describe('When a default button is rendered', () => {
            let renderedButton;
            before(() => {
                renderedButton = renderIntoDocument(<Button />);
            });
            it('should have the default props', () => {
                const {type, shape, label, icon, id, hasRipple, isJs, iconLibrary} = renderedButton.props;
                expect(type).to.equal('submit');
                expect(shape).to.equal('raised');
                expect(label).to.equal('');
                expect(icon).to.be.null;
                expect(id).to.equal('');
                expect(hasRipple).to.be.false;
                expect(type).to.equal('submit');
                expect(iconLibrary).to.equal('material');
            });
        });
        describe('When a configured button is rendered', () => {
            describe('When we give hasRipple prop to true', () => {
                let renderedButton;
                before(() => {
                    renderedButton = renderIntoDocument(<Button hasRipple={true}/>);
                });
                it('should give add the material mention in the className', () => {
                    const {hasRipple} = renderedButton.props;
                    const {materialButton} = renderedButton.refs;
                    expect(hasRipple).to.be.true;
                    expect(materialButton.className).to.equal('mdl-button  mdl-button--raised  mdl-js-ripple-effect');
                });
            });
            describe('When we set the shape props to "FAB"', () => {
                let renderedButton;
                before(() => {
                    renderedButton = renderIntoDocument(<Button shape='fab'/>);
                });
                it('should give add the fab mention in the className', () => {
                    const {materialButton} = renderedButton.refs;
                    expect(materialButton.className).to.equal('mdl-button  mdl-button--fab');
                });
            });
        });
    });
});
