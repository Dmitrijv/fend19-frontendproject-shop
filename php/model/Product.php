<?php

class Product {

    private $id;
    private $title;
    private $description;
    private $priceValue;
    private $priceCurrency;
    private $numberInStock;
    private $imageGallery;

    public function __construct($id, $title, $description, $priceValue, $priceCurrency, $numberInStock, $imageGallery ){
        $this -> id = $id;
        $this -> name = $name;
        $this -> description = $description;
        $this -> price = rand(100, 1000)."kr";
        $this -> numberInStock = rand(0, 100);
    }

    public function setImage($imageUrl){
        $this -> image = $imageUrl;
    }
    
    public function toArray(){
        return array(
            "id" => $this -> id,
            "name" => $this -> name,
            "description" => $this -> description,
            "price" => $this -> price,
            "numberInStock" => $this -> numberInStock,
            "image" => $this -> image,
        );
    }
}