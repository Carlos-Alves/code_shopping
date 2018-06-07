<?php

use Faker\Generator as Faker;


$factory->define(CodeShopping\Models\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->city,
        'description' => $faker->words(3, true),
        'price' => $faker->randomFloat(2, 100, 1000)
    ];
});
