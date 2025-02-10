<?php

namespace App\Http\Controllers;

class BreadcrumbController extends Controller
{
  public function getBreadcrumbs($currentRoute)
  {
    // Map des routes et leurs breadcrumbs
    $breadcrumbsMap = [
      'dashboard' => [
        ['name' => 'Dashboard', 'route' => 'dashboard']
      ],
      'users.index' => [
        ['name' => 'Dashboard', 'route' => 'dashboard'],
        ['name' => 'Users', 'route' => 'users.index']
      ],
      'users.edit' => [
        ['name' => 'Dashboard', 'route' => 'dashboard'],
        ['name' => 'Users', 'route' => 'users.index'],
        ['name' => 'Edit User', 'route' => 'users.edit']
      ],
      // Ajoutez d'autres routes selon vos besoins
    ];

    return $breadcrumbsMap[$currentRoute] ?? [];
  }
}
