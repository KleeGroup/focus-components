import React, {PropTypes, Component} from 'react';

import user from 'focus-core/user';
import intersection from 'lodash/array/intersection';
import isArray from 'lodash/lang/isArray';

class Role extends Component { 
    render() {
        const {hasAll,hasOne,children,emptyBlock} = this.props;
        let userRoles = user.getRoles();
        //console.log("emptyBlock",emptyBlock);
        if(isArray(hasAll) && intersection(userRoles, hasAll).length === hasAll.length) {
            return children;
        } else if(isArray(hasOne) && intersection(userRoles, hasOne).length > 0) {
            return children;
        }
        return emptyBlock;
    }
}


Role.displayName = 'Role';
Role.defaultProps = {
    emptyBlock: null
};
Role.propTypes = {
    children : PropTypes.object,
    hasOne: PropTypes.array,
    hasAll:PropTypes.array
};


export default Role;
