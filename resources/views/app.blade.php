<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Ahmed\'sFolio') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        <script src="https://cdn.jsdelivr.net/npm/frappe-charts@1.0.0/dist/frappe-charts.min.iife.js"></script>
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
        <div id='chart' style="display:none"></div>
        <script>
            const global = globalThis
        </script>
    </body>
</html>
