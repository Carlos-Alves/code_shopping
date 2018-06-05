<?php

use Faker\Generator as Faker;

$factory->define(CodeShopping\Models\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'description' => $faker->words(3, true),
        'price' => $faker->randomNumber(4)
    ];
});
