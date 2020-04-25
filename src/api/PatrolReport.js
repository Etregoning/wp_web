import * as constants from './types';
import WPAPI from './WildernessPatrolAPI';

const wp = WPAPI;

class PatrolReport {
    static parks = null;
    static initState = {
        user_id: 0,
        startTime: new Date(),
        endTime: new Date(),
        numVisitor: 0,
        visitorTypes: {
            [constants.SAFETY_PREVENTION]: false,
            [constants.VIOLATION_WITNESSED]: false,
            [constants.INTERPRETATION]: false,
            [constants.DIRECTIONS_HANDED_OUT]: false,
            [constants.LOST_HIKERS_REPORTED]: false,
            [constants.MINOR_MEDICAL]: false,
            [constants.MAJOR_MEDICAL]: false,
            [constants.OTHER]: false,
        },
        otherVisitorTypeDescription: '',
        notes: '', // {string}
        photos: [], // {array of images}
        park: {},
        manualParkName: '',
        trails: [],
        isUploaded: false,
    }

    constructor(props) {
        Object.keys(PatrolReport.initState).forEach((field) => {
            if (field === 'visitorTypes') {
                this.visitorTypes = {};
                Object.keys(PatrolReport.initState.visitorTypes).forEach((key) => {
                    this.visitorTypes[key] = false;
                });
            } else if (field === 'photos' || field === 'trails') {
                this[field] = [];
            } else if (field === 'park') {
                this[field] = {};
            } else {
                this[field] = PatrolReport.initState[field];
            }
        });
        if (props) {
            Object.keys(props).forEach((field) => {
                if (field === 'visitorTypes') {
                    // TODO: support multi types
                    if (typeof props[field] === 'string' || props[field] instanceof String) {
                        Object.keys(PatrolReport.initState[field]).forEach((key) => {
                            if (props[field].search(key) !== -1) {
                                this[field][key] = true;
                            }
                        });
                    }
                } else if (field === 'startTime' || field === 'endTime') {
                    this[field] = new Date(props[field]);
                } else if (field === 'numVisitor') {
                    const num = parseInt(props[field], 10);
                    this[field] = isNaN(num) ? 0 : num;
                } else if (field === 'parks' && props[field].length > 0) {
                    this[field] = props[field];
                    this.park = props[field][0];
                } else if (field === 'photos') {
                    let photo;
                    for (let i = 0; i < props.photos.length; i++) {
                        if ('id' in props.photos[i] && !('isStored' in props.photos[i])) {
                            photo = {
                                id: props.photos[i].id,
                                isStored: false,
                                uri: wp.getPhotoURL(props, i),
                            };
                        } else {
                            photo = props.photos[i];
                        }
                        this.photos.push(photo);
                    }
                } else if (field === 'trails') {
                    if (props.parks && props.parks.length > 0) {
                        // console.log('reallyyy?', PatrolReport.parks);
                        const park = PatrolReport.parks.find(p => props.parks[0].slug === p.slug);
                        if (park != null) {
                            let tIdx;
                            for (let i = 0; i < park[field].length; i++) {
                                this[field].push(false);
                            }
                            props[field].forEach((tWalked) => {
                                tIdx = park.trails.findIndex(trail => tWalked.name === trail.name);
                                this[field][tIdx] = true;
                            });
                        }
                    }
                } else {
                    this[field] = props[field];
                }
            });
        }
    }
}

export default PatrolReport;
