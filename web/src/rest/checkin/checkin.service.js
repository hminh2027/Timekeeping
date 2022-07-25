// import {BaseService} from '../base-service';
// import {API_ENDPOINTS} from '../endpoints';
// import moment from 'moment';

// export interface InputCheckin {
//   image: string;
//   longitude: string;
//   latitude: string;
// }

// class Checkin extends BaseService {
//   getCheckin() {
//     return this.http.get(API_ENDPOINTS.CHECK_IN).then(res => res.data);
//   }
//   createCheckin(input: InputCheckin) {
//     return this.http.post(API_ENDPOINTS.CHECK_IN, input).then(res => res.data);
//   }
//   createCheckout(input: InputCheckin) {
//     return this.http.patch(API_ENDPOINTS.CHECK_IN, input).then(res => res.data);
//   }
//   getTodayCheckin() {
//     return this.http
//       .get('checkin', {
//         params: {
//           fromDate: moment().format('YYYY-MM-DD'),
//           toDate: moment().add(1, 'd').format('YYYY-MM-DD'),
//         },
//       })
//       .then(res => res.data);
//   }
// }

// export const CheckinService = new Checkin('');
