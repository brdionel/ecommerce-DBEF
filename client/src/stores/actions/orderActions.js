import { GET_ALL_ORDERS, GET_CANCEL_ORDERS, GET_CLOSED_ORDERS, GET_DISPATCHED_ORDERS, 
 GET_PENDING_ORDERS, ORDER_STATE_CHANGE} from '../types/orderTypes';


    export function getClosedOrders() {
        return function (dispatch) {
          return fetch('http://localhost:3002/orders/admin?search=completa', {
            credentials: 'include',
          })
            .then((res) => res.json())
            .then((closedOrders) =>
              dispatch({
                type: GET_CLOSED_ORDERS,
                payload: closedOrders,
              })
            )
        }
      }
      
      export function getPendingOrders() {
        return function (dispatch) {
          return fetch('http://localhost:3002/orders/admin?search=procesando', {
            credentials: 'include',
          })
            .then((res) => res.json())
            .then((pendingOrders) =>
              dispatch({
                type: GET_PENDING_ORDERS,
                payload: pendingOrders,
              })
            )
        }
      }
      
      export function getCancelOrders() {
        return function (dispatch) {
          return fetch('http://localhost:3002/orders/admin?search=cancelada', {
            credentials: 'include',
          })
            .then((res) => res.json())
            .then((cancelOrders) =>
              dispatch({
                type: GET_CANCEL_ORDERS,
                payload: cancelOrders,
              })
            )
        }
      }
      
      export function getDispatchedOrders() {
        return function (dispatch) {
          return fetch('http://localhost:3002/orders/admin?search=despachado', {
            credentials: 'include',
          })
            .then((res) => res.json())
            .then((dispatchedOrders) =>
              dispatch({
                type: GET_DISPATCHED_ORDERS,
                payload: dispatchedOrders,
              })
            )
        }
      }
      
      export function getAllOrders() {
        return function (dispatch) {
          return fetch('http://localhost:3002/orders/admin?all=true', {
            credentials: 'include',
          })
            .then((res) => res.json())
            .then((allOrders) =>
              dispatch({
                type: GET_ALL_ORDERS,
                payload: allOrders,
              })
            )
        }
      }

      export function orderStateChange(orderId, status) {
        return function (dispatch) {
          return fetch(`http://localhost:3002/orders/stateChange`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: orderId, state: status }),
          })
            .then((res) => res.json())
            .then((data) =>
              dispatch({
                type: ORDER_STATE_CHANGE,
                payload: data,
              })
            )
        }
      }

      export function getClosedOrdersByUser() {
        return function (dispatch) {
      
          return fetch('http://localhost:3002/orders/user/me', {
      
            credentials: 'include',
          })
            .then((res) => res.json())
            .then((closedOrders) => {
              if (closedOrders.error) {
                return closedOrders
              } else {
                dispatch({
                  type: GET_CLOSED_ORDERS,
                  payload: closedOrders,
                })
                return closedOrders
              }
            })
            .catch((err) => console.log('error al buscar ordenes'))
        }
      }