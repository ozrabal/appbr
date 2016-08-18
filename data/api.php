<?php
//fake api

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function dump( $var ) {
    echo '<pre>' . print_r( $var, true ) . '</pre>';
}
function slugify($string) {
    $string = transliterator_transliterate("Any-Latin; NFD; [:Nonspacing Mark:] Remove; NFC; [:Punctuation:] Remove; Lower();", $string);
    $string = preg_replace('/[-\s]+/', '-', $string);
    return trim($string, '-');
}

function random_color() {
    return dechex(rand(0x000000, 0xFFFFFF));
}

//echo password_hash('password');
error_reporting(E_ALL);

require_once('LoremIpsum.php');
require_once('src/BeforeValidException.php');
require_once('src/ExpiredException.php');
require_once('src/SignatureInvalidException.php');
require_once('src/JWT.php');

use \Firebase\JWT\JWT;


define('SECRET_KEY', 'UNVNfZMrmbWQYI5ssihHBnLmaFZvqgBBHUVhC8imhY6z1urfi2MYs1SpiiMve8nywK/bg8v4B16zBC96cOeOyA' );



$method = $_SERVER['REQUEST_METHOD'];

$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

$rest = 'request_'.strtolower( $_SERVER['REQUEST_METHOD'] );


if (function_exists($rest) ) call_user_func($rest, $request);

function request_post(){
    $params = json_decode(file_get_contents('php://input'), true);
    $apiCallback = 'api_' . $params['api'];
    if($params['api'] !== 'login') {
        check_authorization();
    }
    if (function_exists($apiCallback)) call_user_func($apiCallback, $params);
}

function request_get(){
    if(!empty($_GET)) {
        $params = $_GET;
        $apiCallback = 'api_' . $params['api'];
        check_authorization();
        if (function_exists($apiCallback)) call_user_func($apiCallback, $params);
    }
    die();
}

function check_authorization(){
    $requestHeaders = apache_request_headers();
    if( empty($requestHeaders['Authorization']) ) {
        header('HTTP/1.0 401 Unauthorized');
        die();
    }
}

function token_data(){
    $tokenId    = base64_encode(mcrypt_create_iv(32));
    $issuedAt   = time();
    $notBefore  = $issuedAt + 10;             //Adding 10 seconds
    $expire     = $notBefore + 60;            // Adding 60 seconds
    $serverName = 'brand.dv'; // Retrieve the server name from config file

    $data = [
        'iat'  => $issuedAt,         // Issued at: time when the token was generated
        'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
        'iss'  => $serverName,       // Issuer
        'nbf'  => $notBefore,        // Not before
        'exp'  => $expire,           // Expire
        'data' => [                  // Data related to the signer user
            'userId'   => 1, // userid from the users table
            'userName' => 'John Doe', // User name
        ]
    ];
    return $data;
}

function token_create(){
    $jwt = JWT::encode(token_data(), SECRET_KEY);
    return $jwt;
}

//API
function api_login($params){
    if(empty($params['credentials']['user']) || empty($params['credentials']['password'])){
        header('HTTP/1.0 401 Unauthorized');
        die();
    }
    if(api_login_check_credentials($params['credentials']['user'], $params['credentials']['password'])){
        $token = token_create();
        echo json_encode(
            array(
                'user' => array(
                    'name' => 'John Doe',
                    'email' => 'john@doe.com'
                ),
                'accessToken' => $token
            )
        );
    }else{
        header('HTTP/1.0 401 Unauthorized');
        die();
    }
}

function api_login_check_credentials($user, $password){
    if( $user === 'user' && $password === 'password'){
        return true;
    }
    return false;
}

function api_bookmarks($params){
    echo json_encode(api_bookmarks_items($params['category'], $params['limit']));

}

function api_bookmarks_items($category = null, $limit = 10){
    $lipsum = new joshtronic\LoremIpsum();
    $items = array();
    for($i=1;$i<=$limit; $i++){
        $title = $lipsum->words(rand(2,5));
        $items[] = array(
                'id' => uniqid(),
                'title' => $title,
                'slug' => slugify($title),
                'content' => $lipsum->sentences(rand(1,5)),
                'category' => $category,
                'color' => random_color()
        );
    }
    return $items;
}

function api_categories($params){
    echo json_encode(api_categories_categories($params['limit']));
}

function api_categories_categories($limit = 5){
    $lipsum = new joshtronic\LoremIpsum();
    $items = array();
    for($i=1;$i<=$limit; $i++){
        $name = $lipsum->words(rand(1,2));
        $items[] = array(
            'id' => uniqid(),
            'name' => $name,
            'slug' => slugify($name)
        );
    }
    return $items;
}

function api_item($params){
    echo json_encode(api_item_item($params['id']));
}

function api_item_item($id = null){
    if(empty($id)){
        $id = uniqid();
    }
    $lipsum = new joshtronic\LoremIpsum();
    $title = $lipsum->words(rand(2,5));
    $item = array(
        'id' => $id,
        'title' => $title,
        'slug' => slugify($title),
        'content' => $lipsum->sentences(rand(1,10)),
    );
    return $item;
}