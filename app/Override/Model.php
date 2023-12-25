<?php

namespace App\Override;

use Exception;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Model as LaravelEloquentUUIDModel;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Str;

class Model extends LaravelEloquentUUIDModel
{
    /**
     * @throws \Exception
     * @return string
     */
    protected function generateUuid(): string
    {
        switch ($this->uuidVersion) {
            case 1:
                return $this->normalize(Uuid::uuid1()->toString());
            case 4:
                return $this->normalize(Uuid::uuid4()->toString());
        }

        throw new Exception("UUID version [{$this->uuidVersion}] not supported.");
    }

    /**
     * Transforms the normal UUID in a 32 character uppercase hex code.
     * 
     * @return string
     */
    protected function normalize($uuid): string
    {
        $cleared = preg_replace('/[^0-9A-Fa-f]/', '', $uuid);
        return Str::upper($cleared);
    }
}
