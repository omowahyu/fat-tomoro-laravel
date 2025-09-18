<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FileUploadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->canUpload();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'file' => [
                'required',
                'file',
                'max:10240', // 10MB in KB
                'mimes:csv,xlsx,xls',
            ],
            'type' => [
                'required',
                'string',
                // accept legacy and new canonical values; will normalize in service
                'in:BOH,BI,BANK,boh_purchase,bi_sales,bank_statement',
            ],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'file.required' => 'Please select a file to upload.',
            'file.max' => 'File size must not exceed 10MB.',
            'file.mimes' => 'Only CSV and Excel files (xlsx, xls) are allowed.',
            'type.required' => 'Please specify the file type.',
            'type.in' => 'File type must be BOH, BI, or BANK.',
        ];
    }

    /**
     * Get custom attribute names for validation errors.
     */
    public function attributes(): array
    {
        return [
            'file' => 'uploaded file',
            'type' => 'file type',
        ];
    }
}
