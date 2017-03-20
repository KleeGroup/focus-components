import React from 'react'
import {component as Field} from '../';

const {renderIntoDocument,findAllInRenderedTree} = TestUtils;
const alertSpy = sinon.spy();

const fieldName = 'testField';
const fieldLabel = 'label value';
const fieldValue = 'field value';
const newFieldValue = 'new value';


const fieldLabelContainer = 'field-label-container';
const fieldValueContainer = 'field-value-container';


describe('The Field component', () => {
    describe('Field is not editable', () => { 

        const testedReactCpt = (<Field name={fieldName} value={fieldValue} isEdit={false}
            label={fieldLabel}
                                />);
        let reactComponent,domNode;
 
        before(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);
            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.to.equal(null);
            expect(reactComponent.getValue()).to.equal(fieldValue);
        });

        it('label is rendered nd not editable', () => {
            //label value
            const labelCpts = TestFocus.findFocusElementsWithDataFocus(reactComponent,fieldLabelContainer);
            expect(labelCpts.length).to.equal(1);
            const labelCpt = labelCpts[0];
            expect(labelCpt.textContent).to.equal(fieldLabel);
        });

        it('text is rendered and not editable', () => {
            //search with data-focus dependant of the component architecture
            const valueCpts = TestFocus.findFocusElementsWithDataFocus(reactComponent,fieldValueContainer);
            expect(valueCpts.length).to.equal(1);
            const valueCpt = valueCpts[0];
            expect(valueCpt.textContent).to.equal(fieldValue);
            expect(valueCpt.tagName).to.equal(TestFocus.TAG_DIV);

            //search with text content in inner html
            const textCpts = TestFocus.findElementWithInnerHTML(reactComponent,fieldValue);
            expect(textCpts.length).to.equal(1);
            const textCpt = textCpts[0];
            expect(textCpt.tagName).to.equal(TestFocus.TAG_DIV);
        });


    });

    describe('Field is editable', () => {
        const testedReactCpt = (<Field name={fieldName} value={fieldValue} isEdit
            label={fieldLabel}
                                />);
        let reactComponent,domNode;


        before(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);

            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.to.equal(null);
            expect(reactComponent.getValue()).to.equal(fieldValue);
        });

        it('label is rendered and not editable', () => {
            //label value
            const labelCpts = TestFocus.findFocusElementsWithDataFocus(reactComponent,fieldLabelContainer);
            expect(labelCpts.length).to.equal(1);
            const labelCpt = labelCpts[0];
            expect(labelCpt.textContent).to.equal(fieldLabel);
        });

        it('text is rendered and editable', () => {
            //text value
            const valueCpts = TestFocus.findFocusElementsWithDataFocus(reactComponent,fieldValueContainer);
            expect(valueCpts.length).to.equal(1);
            const valueCpt = valueCpts[0];

            //search with text content in inner html
            const readOnlyTextCpts = TestFocus.findElementWithInnerHTML(reactComponent,fieldValue);
            expect(readOnlyTextCpts.length).to.equal(0);

            const textCpts = TestFocus.findElementWithValue(reactComponent,fieldValue);
            expect(textCpts.length).to.equal(1);
            const textCpt = textCpts[0];
            expect(textCpt.tagName).to.equal(TestFocus.TAG_INPUT);
        });

        it('text is modified', () => {
            const textCpts = TestFocus.findElementWithValue(reactComponent,fieldValue);
            expect(textCpts.length).to.equal(1);
            const textCpt = textCpts[0];
            //simulating change event
            TestUtils.Simulate.change(textCpt,{target: {value: newFieldValue}});
            expect(reactComponent.getValue()).to.equal(newFieldValue);
        });

    });

    const fieldValueNumber = 3;
    const newFieldValueNumber = 10;

    describe('Field value is a number', () => {
        const testedReactCpt = <Field name={fieldName} value={fieldValueNumber} isEdit type='number' />;
        let reactComponent,domNode;

        before(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);

            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.to.equal(null);
            expect(reactComponent.getValue()).to.equal('' + fieldValueNumber);
        });
        it('number value is modified', () => {
            const textCpts = TestFocus.findElementWithValue(reactComponent,fieldValue);
            expect(textCpts.length).to.equal(1);
            const textCpt = textCpts[0];
            //simulating change event
            TestUtils.Simulate.change(textCpt,{target: {value: newFieldValueNumber}});
            expect(reactComponent.getValue()).to.equal('' + newFieldValueNumber);
        });
        it('text value is blocked', () => {
            const textCpts = TestFocus.findElementWithValue(reactComponent,fieldValue);
            expect(textCpts.length).to.equal(1);
            const textCpt = textCpts[0];
            //simulating change event
            TestUtils.Simulate.copy(textCpt,{target: {value: newFieldValueNumber}});
            expect(reactComponent.getValue()).to.equal('' + newFieldValueNumber);

            TestUtils.Simulate.copy(textCpt,{target: {value: newFieldValue}});
            expect(reactComponent.getValue()).to.equal('' + newFieldValueNumber);
        });
    });

    describe('Field has a formatter', () => {
        const formatter = function(data) {return data + ' formatter applied';}
        const testedReactCpt = <Field name={fieldName} value={fieldValue} isEdit={false} formatter={formatter} />;
        let reactComponent,domNode;

        before(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);
            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.to.equal(null);
        });

        it('value is formatted', () => {
            const valueCpts = TestFocus.findFocusElementsWithDataFocus(reactComponent,fieldValueContainer);
            expect(valueCpts.length).to.equal(1);
            const valueCpt = valueCpts[0];
            expect(valueCpt.textContent).to.equal(formatter(fieldValue));
        });
    });
});
