<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserCRUDResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request("sort_field", "id");
        $sortDirection = request("sort_direction", "desc");

        if(request('name')){
            $query->where("name", "like", "%". request("name") . "%");
        }

        if(request('status')){
            $query->where("status", "like", "%". request("status") . "%");
        }


        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(30)
            ->onEachSide(1);

        return inertia('task/index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::all();

        return inertia('task/create', [
            'users' => UserCRUDResource::collection($users),
            'projects' => ProjectResource::collection($projects)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        try {
            $data = $request->validated();
            /** @var $image \Illuminate\Http\UploadedFile  */
            $image = $data['image'] ?? null;
            $data['created_by'] = Auth::id();
            $data['updated_by'] = Auth::id();

            if ($image) {
                $data['image_path'] = $image->store('task/'.Str::random(10), 'public');
            }

            Task::create($data);

            return to_route('task.index')->with('success', 'Task created successfully.');
        } catch (\Throwable $th) {
            //throw $th;
            return to_route('task.index')->with('error', 'Task Not created');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $query = $task->project->tasks();


        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if(request('name')){
            $query->where("name", "like", "%". request("name") . "%");
        }

        if(request('status')){
            $query->where("status", "like", "%". request("status") . "%");
        }

        $tasks = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('task/show', [
            'task' => new TaskResource($task),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::all();
        $users = User::all();

        return inertia('task/edit', [
            'users' => UserCRUDResource::collection($users),
            'projects' => ProjectResource::collection($projects),
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile  */
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();

        if ($image) {
            if($task->image_path){
                Storage::disk('public')->deleteDirectory(dirname
                ($task->image_path));
            }
            $data['image_path'] = $image->store('task/'.Str::random(10), 'public');
        }

        $task->update($data);

        return to_route('task.index')->with('success', "Task \"$task->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        if($task->image_path){
            Storage::disk('public')->deleteDirectory(dirname
            ($task->image_path));
        }
        return to_route('task.index')->with('success', "Task '$name' deleted successfully.");
    }
}
