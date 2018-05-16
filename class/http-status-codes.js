/**
 * Constants defining the HTTP status codes
 *
 * @author Pablo de la Concepcion Sanz <pconcepcion@vanadis.es>
 * @see http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 * @see http://en.wikipedia.org/w/index.php?title=List_of_status_codes
 * @see http://www.restapitutorial.com/httpstatuscodes.html
 *
 */

const HTTP = {
    ///////////////////////
    // 1xx Informational //
    ///////////////////////

    // Request received, continuing process.

    /**
   * @def Continue http status code (100)
   */
    'STATUS_CONTINUE': 100,
    /**
   * @def Switching Protocols http status code (101)
   */
    'STATUS_SWITCHING_PROTOCOLS': 101,
    /**
   * @def Processing http status code (102)
   */
    'STATUS_PROCESSING': 102,

    /////////////////
    // 2xx Success //
    /////////////////

    // This class of status codes indicates the action requested by the client was received, understood, accepted and processed successfully.

    /**
   * @def OK http status code (200)
   */
    'STATUS_OK': 200,
    /**
   * @def Created http status code (201)
   */
    'STATUS_CREATED': 201,
    /**
   * @def Accepted http status code (202)
   */
    'STATUS_ACCEPTED': 202,
    /**
   * @def Non-Authoritative Information http status code (203)
   */
    'STATUS_NON_AUTHORITATIVE_INFORMATION': 203,
    /**
   * @def No Content http status code (204)
   */
    'STATUS_NO_CONTENT': 204,
    /**
   * @def Reset Content http status code (205)
   */
    'STATUS_RESET_CONTENT': 205,
    /**
   * @def Partial Content http status code (206)
   */
    'STATUS_PARTIAL_CONTENT': 206,
    /**
   * @def Multi-Status http status code (207)
   */
    'STATUS_MULTI_STATUS': 207,
    /**
   * @def Already Reported http status code (208)
   */
    'STATUS_ALREADY_REPORTED': 208,
    /**
   * @def IM_Used http status code (226)
   */
    'STATUS_IM_USED': 226,

    /////////////////////
    // 3xx Redirection //
    /////////////////////

    // The client must take additional action to complete the request

    /**
   * @def Multiple Choices http status code (300)
   */
    'STATUS_MULTIPLE_CHOICES': 300,
    /**
   * @def Moved Permanently http status code (301)
   */
    'STATUS_MOVED_PERMANENTLY': 301,
    /**
   * @def Found http status code (302)
   */
    'STATUS_FOUND': 302,
    /**
   * @def See Other http status code (303)
   */
    'STATUS_SEE_OTHER': 303,
    /**
   * @def Not Modified http status code (304)
   */
    'STATUS_NOT_MODIFIED': 304,
    /**
   * @def Use Proxy http status code (305)
   */
    'STATUS_USE_PROXY': 305,
    /**
   * @def Reserved http status code (306)
   */
    'STATUS_RESERVED': 306,
    /**
   * @def Temporary Redirect http status code (307)
   */
    'STATUS_TEMPORARY_REDIRECT': 307,
    /**
   * @def Permanent Redirect http status code (308)
   */
    'STATUS_PERMANENT_REDIRECT': 308,

    //////////////////////
    // 4xx Client Error //
    //////////////////////

    // The 4xx class of status code is intended for cases in which the client seems to have erred

    /**
   * @def Bad Request http status code (400)
   */
    'STATUS_BAD_REQUEST': 400,
    /**
   * @def Unauthorized http status code (401)
   */
    'STATUS_UNAUTHORIZED': 401,
    /**
   * @def Payment Required http status code (402)
   */
    'STATUS_PAYMENT_REQUIRED': 402,
    /**
   * @def Forbidden http status code (403)
   */
    'STATUS_FORBIDDEN': 403,
    /**
   * @def Not Found http status code (404)
   */
    'STATUS_NOT_FOUND': 404,
    /**
   * @def Method Not Allowed http status code (405)
   */
    'STATUS_METHOD_NOT_ALLOWED': 405,
    /**
   * @def Not Acceptable http status code (406)
   */
    'STATUS_NOT_ACCEPTABLE': 406,
    /**
   * @def Proxy Authentication Required http status code (407)
   */
    'STATUS_PROXY_AUTHENTICATION_REQUIRED': 407,
    /**
   * @def Request Timeout http status code (408)
   */
    'STATUS_REQUEST_TIMEOUT': 408,
    /**
   * @def Conflict http status code (409)
   */
    'STATUS_CONFLICT': 409,
    /**
   * @def Gone http status code (410)
   */
    'STATUS_GONE': 410,
    /**
   * @def Length Required http status code (411)
   */
    'STATUS_LENGTH_REQUIRED': 411,
    /**
   * @def Precondition Failed http status code (412)
   */
    'STATUS_PRECONDITION_FAILED': 412,
    /**
   * @def Request Entity Too Large http status code (413)
   */
    'STATUS_REQUEST_ENTITY_TOO_LARGE': 413,
    /**
   * @def Request-URI_Too Long http status code (414)
   */
    'STATUS_REQUEST_URI_TOO_LONG': 414,
    /**
   * @def Unsupported Media Type http status code (415)
   */
    'STATUS_UNSUPPORTED_MEDIA_TYPE': 415,
    /**
   * @def Requested Range Not Satisfiable http status code (416)
   */
    'STATUS_REQUESTED_RANGE_NOT_SATISFIABLE': 416,
    /**
   * @def Expectation Failed http status code (417)
   */
    'STATUS_EXPECTATION_FAILED': 417,
    /**
   * @def Unprocessable Entity http status code (422)
   */
    'STATUS_UNPROCESSABLE_ENTITY': 422,
    /**
   * @def Locked http status code (423)
   */
    'STATUS_LOCKED': 423,
    /**
   * @def Failed Dependency http status code (424)
   */
    'STATUS_FAILED_DEPENDENCY': 424,
    /**
   * @def Upgrade Required http status code (426)
   */
    'STATUS_UPGRADE_REQUIRED': 426,
    /**
   * @def Precondition Required http status code (428)
   */
    'STATUS_PRECONDITION_REQUIRED': 428,
    /**
   * @def Too Many Requests http status code (429)
   */
    'STATUS_TOO_MANY_REQUESTS': 429,
    /**
   * @def Request Header Fields Too Large http status code (431)
   */
    'STATUS_REQUEST_HEADER_FIELDS_TOO_LARGE': 431,

    //////////////////////
    // 5xx Server Error //
    //////////////////////

    // The server failed to fulfill an apparently valid request

    /**
   * @def Internal Server Error http status code (500)
   */
    'STATUS_INTERNAL_SERVER_ERROR': 500,
    /**
   * @def Not Implemented http status code (501)
   */
    'STATUS_NOT_IMPLEMENTED': 501,
    /**
   * @def Bad Gateway http status code (502)
   */
    'STATUS_BAD_GATEWAY': 502,
    /**
   * @def Service Unavailable http status code (503)
   */
    'STATUS_SERVICE_UNAVAILABLE': 503,
    /**
   * @def Gateway Timeout http status code (504)
   */
    'STATUS_GATEWAY_TIMEOUT': 504,
    /**
   * @def Version Not Supported http status code (505)
   */
    'STATUS_VERSION_NOT_SUPPORTED': 505,
    /**
   * @def Variant Also Negotiates (Experimental) http status code (506)
   */
    'STATUS_VARIANT_ALSO_NEGOTIATES': 506,
    /**
   * @def Insufficient Storage http status code (507)
   */
    'STATUS_INSUFFICIENT_STORAGE': 507,
    /**
   * @def Loop Detected http status code (508)
   */
    'STATUS_LOOP_DETECTED': 508,
    /**
   * @def Not Extended http status code (510)
   */
    'STATUS_NOT_EXTENDED': 510,
    /**
   * @def Network Authentication Required http status code (511)
   */
    'STATUS_NETWORK_AUTHENTICATION_REQUIRED': 511
};

module.exports = HTTP;
