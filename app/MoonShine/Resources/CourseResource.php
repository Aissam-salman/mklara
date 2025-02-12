<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Course;

use Illuminate\Support\Str;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Components\Layout\Box;
use MoonShine\UI\Fields\Date;
use MoonShine\UI\Fields\ID;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\UI\Fields\Image;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Text;

/**
 * @extends ModelResource<Course>
 */
class CourseResource extends ModelResource
{
  protected string $model = Course::class;

  protected string $title = 'Courses';

  /**
   * @return list<FieldContract>
   */
  protected function indexFields(): iterable
  {
    return [
      ID::make()->sortable(),
      Number::make('Ordre', 'order'),
      Text::make('Title', 'title'),
      Text::make('Description', 'description', fn($item) => Str::limit($item->description, 50)),
      Image::make('Image', 'image'),
      Date::make('Created', 'created_at'),
      Date::make('Updated', 'updated_at'),
    ];
  }

  /**
   * @return list<ComponentContract|FieldContract>
   */
  protected function formFields(): iterable
  {
    return [
      Box::make([
        ID::make(),
        Number::make('Ordre', 'order'),
        Text::make('Title'),
        Text::make('Description'),
        Image::make('Image', 'image'),
        Date::make('Created'),
        Date::make('Updated'),
      ])
    ];
  }

  /**
   * @return list<FieldContract>
   */
  protected function detailFields(): iterable
  {
    return [
      ID::make(),
      Number::make('Ordre', 'order'),
      Text::make('Title', 'title'),
      Text::make('Description', 'description'),
      Image::make('Image', 'image'),
      Date::make('Created', 'created_at'),
      Date::make('Updated', 'updated_at'),
    ];
  }

  /**
   * @param Course $item
   *
   * @return array<string, string[]|string>
   * @see https://laravel.com/docs/validation#available-validation-rules
   */
  protected function rules(mixed $item): array
  {
    return [];
  }
}
