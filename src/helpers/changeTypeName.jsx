
function changeTypeName(routeType) {
    switch (routeType) {
        case 'ADULT':
            return 'Volwassene';
        case 'CHILD':
            return 'Kinderroute';
    }
}
export default changeTypeName;