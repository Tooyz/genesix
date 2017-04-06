 const bookRow = () => {
    return {
        restrict: 'AE',
        template: require('./BookRowView.html'),
        scope: {
            book: '=',
            onEdit: '&',
            onDelete: '&'
        }
    }
};
export default bookRow;