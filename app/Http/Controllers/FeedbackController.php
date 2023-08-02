<?php

namespace App\Http\Controllers;

use App\Models\Feedback;

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $feedback;

    public function __construct(Feedback $f) {
        $this->feedback = $f;
    }

    public function index($userId = null)
    {
        $columns = ['id', 'submission_date', 'rating', 'feedback_approved'];
        $feedbacks = $userId ? $this->feedback->firstWhere('user_id', $userId)->select('*')->with('order')->with('project')->with('user')->get($columns) : $this->feedback->select('*')->with('order')->with('project')->with('user')->get($columns);
        return Inertia::render('Feedback/Index', [
            'columns' => $columns,
            'feedbacks' => $feedbacks,
        ]);
    }

     public function change($id, $type) {
        $feedback = $this->feedback->find($id);
        $feedback->feedback_approved = $type ? false : true;
        if($feedback->save()) {
            if($feedback->feedback_approved)
                session()->flash('message', 'Feedback: "'.$id.'" has been Approved');
            else session()->flash('deletion', 'Feedback: "'.$id.'" has been Rejected');
            return redirect()->route('feedback.index');
        }
    }

    public function attestRating($userId, $projectId, $starCount, $orderId) {
        $feedback = $this->feedback->create(
            [
                'submission_date' => Carbon::now()->format('Y-m-d'),
                'rating' => $starCount,
                'feedback_approved' => false,
                'project_id' => $projectId,
                'user_id' => $userId,
                'order_id' => $orderId,
            ],
        );

        session()->flash('message', 'Thank your for your feedback.');
        return redirect()->back();
        
    }

    public function search($userId, $projectId, $orderId) {
        $feedback = $this->feedback->where([
            ['user_id', $userId],
            ['project_id', $projectId],
            ['order_id', $orderId],
        ])->first();

        return response()->json([
            'feedback' => $feedback,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
