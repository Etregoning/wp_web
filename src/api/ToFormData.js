import PatrolReport from './PatrolReport';

const ToFormData = {
    formDataKeys: {
        issue: {
            // need to add date
            date: 'issue[date]',
            title: 'issue[title]', // string
            description: 'issue[description]', // string
            types: 'issue[types]', // string
            otherTypeDescription: 'issue[otherTypeDescription]', // string
            urgency: 'issue[urgency]', // string
            status: 'issue[status]', // number
            latitude: 'issue[latitude]', // number
            longitude: 'issue[longitude]', // number
            photos: 'issue[photos_attributes][][photo]', // object { uri: 'uristring', type: 'image/jpeg', name: 'filename.jpg', }
            parks: 'issue[parks_issues_attributes][][park_id]', // park id
            trails: 'issue[trails_issues_attributes][][trail_id]', // trail id
        },
        patrol: {
            startTime: 'patrol[startTime]',
            endTime: 'patrol[endTime]',
            numVisitor: 'patrol[numVisitor]', // number
            visitorTypes: 'patrol[visitorTypes]',
            otherVisitorTypeDescription: 'patrol[otherVisitorTypeDescription]', // string
            notes: 'patrol[notes]', // string
            photos: 'patrol[photos_attributes][][photo]', // object { uri: 'uristring', type: 'image/jpeg', name: 'filename.jpg', }
            parks: 'patrol[parks_patrols_attributes][][park_id]', // park id
            trails: 'patrol[trails_patrols_attributes][][trail_id]', // trail id
        },
    },

    /**
     * Takes an issue report and returns equivalent form data
     * @param {IssueReport} report ;
     * @returns {FormData};
     */
    issue(report) {
        const data = new FormData();
        const { issue } = ToFormData.formDataKeys;
        Object.keys(issue).forEach((key, ikey) => {
            console.log(`formData.issue...key[${ikey}]=${key}`);
            if (key === 'otherTypeDescription') {
                // do nothing! handled in 'types'
            } else if (key === 'types') {
                if (report.issueType != null) {
                    data.append(issue.types, report.issueType);
                    if (report.issueType === 'Other') {
                        data.append(issue.otherTypeDescription, report.otherTypeDescription);
                    }
                }
            }
            // need to add date to object
             else if (key === 'date') {
                data.append(issue.date, report.date);
            } else if (key === 'parks') {
                if (report.park != null && report.park.id != null) {
                    data.append(issue.parks, report.park.id);
                }
            } else if (key === 'trails') {
                if (report.trail != null && report.trail.id != null) {
                    data.append(issue.trails, report.trail.id);
                }
            } else if (key === 'photos') {
                if (report[key] != null) {
                    report.photos.forEach((photo) => {
                        // filter out photos from server
                        if (!('id' in photo)) {
                            data.append(issue.photos, photo);
                        }
                    });
                }
            } else if (report[key] != null) {
                data.append(issue[key], report[key]);
            }
        });
        return data;
    },

    /**
     * Takes an patrol report and returns equivalent form data
     * @param {PatrolReport} report ;
     * @returns {FormData};
     */
    patrol(report) {
        const data = new FormData();
        const { patrol } = ToFormData.formDataKeys;
        Object.keys(patrol).forEach((key, ikey) => {
            console.log(`formData.patrol...key[${ikey}]=${key}`);
            if (key === 'otherVisitorTypeDescription') {
                // do nothing! 'otherVisitorTypeDescription' handled in 'visitorTypes'
            } else if (key === 'visitorTypes') {
                // Using string addition to handle multiple types
                let vTypes = '';
                Object.keys(report.visitorTypes).forEach((vKey) => {
                    if (report.visitorTypes[vKey]) {
                        vTypes = `${vTypes}${vKey};`;
                    }
                    if (vKey === 'Other') {
                        data.append(patrol.otherVisitorTypeDescription, report.otherVisitorTypeDescription);
                    }
                });
                data.append(patrol[key], vTypes);
            } else if (key === 'startTime' || key === 'endTime') {
                data.append(patrol[key], report[key].toString());
            } else if (key === 'parks') {
                if (report.park.id != null) {
                    data.append(patrol.parks, report.park.id);
                }
            } else if (key === 'trails') {
                let id;
                const park = PatrolReport.parks.find(p => p.id === report.park.id);
                report[key].forEach((trail, index) => {
                    if (trail) {
                        id = park.trails[index].id;
                        console.log(`trail_id=${id}`);
                        data.append(patrol.trails, id);
                    }
                });
            } else if (key === 'photos') {
                report.photos.forEach((photo) => {
                    // filter out photos from server
                    if (!('id' in photo)) {
                        data.append(patrol.photos, photo);
                    }
                });
            } else if (report[key] != null) {
                data.append(patrol[key], report[key]);
            }
        });
        console.log(`ToFormData...patrol.keys=${JSON.stringify(data)}`, data);
        if (data._parts.length < 1) return null;
        return data;
    },

    /**
     * Filter out unchanged key-values and returns an object of updated key-values
     * @param {Object} update ;
     * @param {Object} origin ;
     * @returns {Object};
     */
    filterReport(update, origin) {
        const report = {};
        Object.keys(update).forEach((key) => {
            if (update[key] == null) {
                // do nothing if null or undefined
            } else if (key === 'id') {
                report[key] = update[key];
            } else if (key === 'park' && 'parks' in origin) {
                report[key] = update[key];
            } else if (key === 'trail' && 'trails' in origin) {
                if ('id' in update[key]
                    && origin.trails.findIndex(ov => ov.id === update[key].id) === -1) {
                    report[key] = update[key];
                }
            } else if (key === 'parks') {
                // filter out matching id in array of objects
                const array = update[key]
                    .filter(uv => origin[key].findIndex(ov => ov.id === uv.id) === -1);
                if (array.length > 0) report[key] = array;
            } else if (key === 'trails') {
                // patrol report trails array
                // keep only changes
                const array = update[key]
                    .map((uv, ui) => uv === true && uv !== origin[key][ui]);
                if (array.length > 0) report[key] = array;
            } else if (key === 'photos') {
                // filter out photos from server
                const photoArray = update[key].filter(p => !('id' in p));
                if (photoArray.length > 0) report[key] = photoArray;
            } else if (key in origin && update[key] === origin[key]) {
                // do nothing if theres no difference
            } else {
                report[key] = update[key];
            }
        });
        return report;
    },
};

export default ToFormData;
