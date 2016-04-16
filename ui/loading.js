import React, * as ui from 'ui';

export const Loading = ({action}) =>
    action.type
        ? <ui.Icon fa="spinner" classes="fa-spin"/>
        : null;
