import { isFunction } from 'lodash';
import assign from 'object-assign';
export default {
    _getDetail: function getDetail() {
        let detailJSON = {};
        for (let blockKey in this.refs) {
            if (isFunction(this.refs[blockKey]._getEntity)) {
                let blockJSON = this.refs[blockKey]._getEntity();
                assign(detailJSON, {
                    [blockKey]: blockJSON
                });
            }
        }
        return detailJSON;
    }
};
